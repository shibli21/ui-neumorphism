import globalModule from '../components/styles.css'

export const getModuleClasses = (localModule: Record<string, string>, classNames: string): string => {
  const styles: Record<string, string> = {
    ...localModule,
    ...globalModule
  }
  return classNames
    .replace(/^\s+|\s+$/g, '')
    .split(/\s+/)
    .map((cl) => styles[cl.trim()])
    .join(' ')
    .trim()
}

export const callCallback = (callback: any, data: any): void => {
  if (callback && typeof callback === 'function') {
    callback(data)
  }
}



export const pickKeys = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const newObj: Partial<Pick<T, K>> = {}
  const keysLength = keys.length
  for (let i = 0; i < keysLength; i++) {
    if (Object.prototype.hasOwnProperty.call(obj, keys[i])) {
      newObj[keys[i]] = obj[keys[i]]
    }
  }
  return newObj as Pick<T, K>
}

export const uid = (): string => {
  return `_${(((1 + Math.random()) * 0x10000) | 0).toString(8).substring(1)}_`
}

