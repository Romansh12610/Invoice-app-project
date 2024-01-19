
type UniqueKeysType = 'FORM' | 'BACKDROP' | 'MODAL';

const keyMap = new Map<UniqueKeysType, string>();
keyMap.set('FORM', 'form_modal-key');
keyMap.set('BACKDROP', 'backdrop-key');
keyMap.set('MODAL', 'modal-key');

export default keyMap;