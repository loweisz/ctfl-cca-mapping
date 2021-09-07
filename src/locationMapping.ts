import {KnownSDK, Locations} from "@contentful/app-sdk";

function importAllFiles() {
  // @ts-ignore
  const locationFolder = require.context('./locations', false)
  let locationKeys = locationFolder.keys()
  locationKeys = locationKeys.filter((key: string) => key.includes('tsx'))

  const modules = locationKeys.map(locationFolder)
  return modules.reduce((acc: any, el: any, index: any) => {
    return ({...acc, [locationKeys[index].split('.')[1].split('/')[1] as keyof Locations]: el.default})
  }, {})


}

export function getComponentOfLocation(sdk: KnownSDK) {
  const files = importAllFiles()
  for (const [key, component] of Object.entries(files)) {
    if (sdk.location.is(key)) {
      return component
    }
  }

  throw new Error('Looks like your are trying to render your app in a location where you dont have the corresponding file.' +
    ' Make sure you have created the correct file in the locations folder')

}
