param location string
param environmentName string

var resourceToken = uniqueString(subscription().id, environmentName)

param tags object = {
  'azd-env-name': environmentName
}

// Domain parameters
param domainName string = 'fatmaali.dev'
param wwwSubdomain string = 'www'

@secure()
param emailHost string
@secure()
param emailPort string
@secure()
param emailUser string
@secure()
param emailPassword string
@secure()
param turnstileSecretKey string
@secure()
param turnstilePublicKey string
@secure()
param publicGaMeasurementId string

resource staticWebApp 'Microsoft.Web/staticSites@2024-04-01' = {
  name: 'swa-${resourceToken}'
  location: location
  tags: union(tags, {
    'azd-service-name': 'web'
  })
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    buildProperties: {
      appLocation: '.'
      outputLocation: 'out'
    }
  }

  resource appSettings 'config' = {
    name: 'appsettings'
    properties: {
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: turnstilePublicKey
      NEXT_PUBLIC_FUNCTION_APP_URL: 'https://${functionApp.properties.defaultHostName}/api'
    }
  }
}

// Storage account for the function app
resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'st${replace(resourceToken, '-', '')}'
  location: location
  tags: union(tags, {
    'azd-service-name': 'fatmaalidevstorage'
  })
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'  
  }
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
}

// Function app hosting plan
resource hostingPlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: 'plan-${resourceToken}'
  location: location
  tags: union(tags, {
    'azd-service-name': 'fatmaalidevhosting'
  })
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
}

// Function app for API
resource functionApp 'Microsoft.Web/sites@2022-03-01' = {
  name: 'func-${resourceToken}'
  location: location
  kind: 'functionapp'
  tags: union(tags, {
    'azd-service-name': 'api'
  })
  properties: {
    serverFarmId: hostingPlan.id
    httpsOnly: true
    siteConfig: {
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'node'
        }
        {
          name: 'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'WEBSITE_CONTENTSHARE'
          value: 'func-${toLower(resourceToken)}'
        }
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '~20'
        }
        {
          name: 'EMAIL_HOST'
          value: emailHost
        }
        {
          name: 'EMAIL_PORT'
          value: emailPort
        }
        {
          name: 'EMAIL_USER'
          value: emailUser
        }
        {
          name: 'EMAIL_PASSWORD'
          value: emailPassword
        }
        {
          name: 'TURNSTILE_SECRET_KEY'
          value: turnstileSecretKey
        }
        {
          name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID'
          value: publicGaMeasurementId
        }
      ]
    }
  }
}

output STATIC_WEB_APP_URL string = 'https://${staticWebApp.properties.defaultHostname}'
output FUNCTION_APP_URL string = 'https://${functionApp.properties.defaultHostName}'
output RESOURCE_GROUP_ID string = resourceGroup().id
output RESOURCE_TOKEN string = resourceToken

// DNS Zone for the custom domain
resource dnsZone 'Microsoft.Network/dnsZones@2018-05-01' = {
  name: domainName
  location: 'global'
  tags: union(tags, {
    'azd-service-name': 'dns'
  })
  properties: {
    zoneType: 'Public'
  }
}

// A record for apex domain pointing to Static Web App
resource apexRecord 'Microsoft.Network/dnsZones/A@2018-05-01' = {
  parent: dnsZone
  name: '@'
  properties: {
    TTL: 3600
    targetResource: {
      id: staticWebApp.id
    }
  }
}

// CNAME record for www subdomain
resource wwwRecord 'Microsoft.Network/dnsZones/CNAME@2018-05-01' = {
  parent: dnsZone
  name: wwwSubdomain
  properties: {
    TTL: 3600
    CNAMERecord: {
      cname: staticWebApp.properties.defaultHostname
    }
  }
}

// TXT record for domain verification (might be required for custom domain validation)
resource txtRecord 'Microsoft.Network/dnsZones/TXT@2018-05-01' = {
  parent: dnsZone
  name: 'asuid'
  properties: {
    TTL: 3600
    TXTRecords: [
      {
        value: [
          staticWebApp.properties.defaultHostname
        ]
      }
    ]
  }
}

// Additional domain verification TXT record for apex domain
resource apexValidationTxtRecord 'Microsoft.Network/dnsZones/TXT@2018-05-01' = {
  parent: dnsZone
  name: '@'
  properties: {
    TTL: 3600
    TXTRecords: [
      {
        value: [
          'azure-static-web-apps-validation=${staticWebApp.name}'
        ]
      }
    ]
  }
}

// Custom domain configuration for the Static Web App
resource customDomain 'Microsoft.Web/staticSites/customDomains@2023-01-01' = {
  parent: staticWebApp
  name: domainName
  properties: {
    validationMethod: 'dns-txt-token'
  }
  dependsOn: [
    dnsZone
    apexRecord
    txtRecord
    apexValidationTxtRecord
  ]
}

// Custom domain configuration for www subdomain
resource wwwCustomDomain 'Microsoft.Web/staticSites/customDomains@2023-01-01' = {
  parent: staticWebApp
  name: '${wwwSubdomain}.${domainName}'
  properties: {
    validationMethod: 'cname-delegation'
  }
  dependsOn: [
    dnsZone
    wwwRecord
  ]
}

// Add DNS Zone name and nameservers to outputs
output DNS_ZONE_NAME string = dnsZone.name
output DNS_NAMESERVERS array = dnsZone.properties.nameServers
