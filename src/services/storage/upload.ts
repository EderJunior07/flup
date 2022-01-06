import {storage} from '../firebase';

// import uuid from 'react-native-uuid';


export const UploadProductImage = async (
  file: File,
  imageId?: string | undefined,
) => {

  const id = imageId ? imageId : 'failed';
  console.log('\x1b[36mUPLOAD USER AVATAR IMAGE:', id);
  const reference = 'users-avatars/' + id;
  try {
    var storageRef = storage.ref();
    var uploadTask = storageRef.child(reference).put(file);

    uploadTask.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    await uploadTask;

    const downloadUrl = await storage.ref(reference).getDownloadURL();
    console.log('DOWNLOAD URL', downloadUrl)
    return downloadUrl;
  } catch (error) {
    alert(error);
    return false;
  }
};
