import  firebase from "firebase";

export default async function uploadProfileBannerURLToStorage(uri: any, profileId: string) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const ref = firebase.storage().ref('profiles/bannerurl/' + profileId)
  const snapshot = await ref.put(blob as any) ;

  // We're done with the blob, close and release it
  blob.close();
  
  
//   UpdateUser(newUserWithPhoto);
  return await snapshot.ref.getDownloadURL();
}

export async function uploadProfileAvatarURLToStorage(uri: any, profileId: string) {

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const ref = firebase.storage().ref('profiles/avatarurl/' + profileId)
  const snapshot = await ref.put(blob as any) ;

  // We're done with the blob, close and release it
  blob.close();
  
  
//   UpdateUser(newUserWithPhoto);
  return await snapshot.ref.getDownloadURL();
}