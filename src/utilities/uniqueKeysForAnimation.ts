
type UniqueKeysType = 'FORM' | 'BACKDROP';

const keyMap = new Map<UniqueKeysType, string>();
keyMap.set('FORM', 'form_modal-key');
keyMap.set('BACKDROP', 'backdrop-key');

export default keyMap;