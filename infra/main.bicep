param location string
param environmentName string

var resourceToken = uniqueString(subscription().id, environmentName)

param tags object = {
  'azd-env-name': environmentName
}

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
}

output STATIC_WEB_APP_URL string = staticWebApp.properties.defaultHostname
output RESOURCE_GROUP_ID string = resourceGroup().id
