param location string
param environmentName string

var resourceToken = uniqueString(subscription().id, environmentName)

param tags object = {
  'azd-env-name': environmentName
}

@secure()
param emailHost string
@secure()
param emailPort string
@secure()
param emailUser string
@secure()
param emailPassword string
@secure()
param recaptchaSecretKey string
@secure()
param recaptchaPublicKey string

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
    appSettings: {
      EMAIL_HOST: emailHost
      EMAIL_PORT: emailPort
      EMAIL_USER: emailUser
      EMAIL_PASSWORD: emailPassword
      RECAPTCHA_SECRET_KEY: recaptchaSecretKey
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: recaptchaPublicKey
    }
  }
}

output STATIC_WEB_APP_URL string = staticWebApp.properties.defaultHostname
output RESOURCE_GROUP_ID string = resourceGroup().id
