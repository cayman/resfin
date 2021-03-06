const appStorage = sessionStorage;

export function getAppStorageItem(name) {
  const item = appStorage.getItem('resfin_' + name);
  try {
    return item ? JSON.parse(item) : null;
  }
  catch (ignored){
    return null;
  }

}

export function setAppStorageItem(name, value) {
  return appStorage.setItem('resfin_' + name, JSON.stringify(value));
}


function createModel(snap) {
  const model = Object.entries(snap.data()).reduce((data, [key,value]) => {
      data[key] = value && typeof value === 'object' && value.toDate ? value.toDate() : value;
      return data;
  }, {id: snap.id});
  console.log('createModel', model);
  return model;
}

export function getSnapList (snap) {
  return snap.docs.map(item => createModel(item));
}

export function getSnapData (snap) {
  return snap.exists ? createModel(snap) : {};
}

export function getSnapUser ({user, credential}) {
  return  {
    id: user.uid,
    token: credential.accessToken,
    email: user.email,
    emailVerified: user.emailVerified,
    name: user.displayName,
    photoURL: user.photoURL,
    metadata: user.metadata,
    u: user.u
  }
}

export function replaceUrl (template, varName, varValue, toLowerCase = false) {
  return template && varValue ? encodeURI(template.replace('{$'+ varName +'}', toLowerCase ? varValue.toLowerCase() : varValue )) : null;
}

export function evalCriterion (criterion = null, value = null) {
  try {
    if (criterion === null || value === null) {
      return null;
    }
    const _criterion = criterion.replace(/\$value/g, value);
    const result = eval(_criterion);
    // console.log('evalCriterion:', _criterion, result);
    return result;

  } catch (error) {
    console.error('evalCriterion', error);
    return null;
  }
}

export function currency(value, fixed, local) {
  const val = fixed!==null && fixed >= 0 ? Number(value).toFixed(fixed) : Number(value).toFixed(6);
  const str = (val * 1).toString();
  return local ? str.replace('.',',') : str;
}

export function percent(interest, price) {
  return (interest / price * 100).toFixed(2);
}

export function parseError(title, error) {
  console.log(title, error);
  return { type: 'error', title, error };
}

const datetimeParser = /(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
export function parseLocaleDatetime(value) {
  const match = value.match(datetimeParser);
  return new Date(
    match[3],  // year
    match[2]-1,  // monthIndex
    match[1],  // day
    match[4],  // hours
    match[5],  // minutes
    match[6]  //seconds
  );
}
const dateParser = /(\d{2}).(\d{2}).(\d{4})/;
export function parseLocaleDate(value) {
  const match = value.match(dateParser);
  return new Date(
    match[3],  // year
    match[2]-1,  // monthIndex
    match[1],  // day
    3,  // hours
    0,  // minutes
    0  //seconds
  );
}

export function parseDate(value) {
    return new Date(value);
}

export function parseValue(val = null, type) {
  let value = val !== null && (typeof val === 'string') && val.trim() ? val.trim() : val;
  return val === null ? null
    : type === Number && typeof value !== 'number' ? Number(value.replace(/\s/g,'').replace(',', '.'))
      : type === Date && (typeof value === 'number' || typeof value === 'string') ? parseDate(value)
        : value;
}

export function parseMoex(metadata) {
  return metadata && metadata.data && metadata.columns && metadata.data[0] ? metadata.columns.reduce((model, column, index) => {
    model[column] = metadata.data[0][index];
    return model;
  },{}) :  {};
}

export function getCurrency(value) {
  return  Number(value.toFixed(2));
}


export function getIsoDate(date) {
  return date ? new Date(date).toISOString().split('T')[0] : null;
}

export function getLocalDate(date) {
  return date ? new Date(date).toLocaleDateString() : null;
}

export function getTimestamp(date) {
  return date ? new Date(date).getTime() : null;
}

export function currentDate() {
  return new Date().toISOString().split('T')[0];
}


export function parseRawText(raw) {
  if (!raw) return [];
  return raw.replace(/\t/g, '|').split('|').filter(f => f !== '')

}