---
layout: post
title: 'Firebase functions - Uploading audio files to firebase storage'
author: [Naoya]
image: ../img/firebase-logo.png
date: '2021-05-26T22:30:00'
draft: false
tags:
  - Firebase
  - ffmpeg
  - Software
excerpt: A use case of firebase functions - uploading audio files to firebase storage.
---

I'm currently working on a language learning app featuring conversation recording (wanna post an article about it soon!).
For its nature, I need to record audios and store them online... here is the part firebase functions and storage come in.

Here is a quick summary of what I've done (There must be better ways... advice is highly appreciated!).

<br>

### Store the audio file in the temporary directry and encode it

---

I send audio file as base64 strings from web/mobile applications to the backend (firebase functions in this case).
I need the audio file to be temporarily stored in the temporary directory (of firebase functions) to encode it into a format needed using ffmpeg as well as to upload it later onto the firebase storage.
In the actual firebase functions, the temporary directly path "/temp/..." can be used but it does not work in the local environment.
Therefore, I generated local temporary directory path using "os" and "path".

```javascript
const fs = require('fs');
const fsp = fs.promises;
const os = require('os');
const path = require('path');
const tempDir = os.tmpdir();

const decodedAudio = Buffer.from(audioString64, 'base64');
const decodedPath = path.join(tempDir, 'decoded.wav');
await fsp.writeFile(decodedPath, decodedAudio);
const encodedPath = path.join(tempDir, 'encoded.m4a');

const ffmpeg_encode_audio = () => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(decodedPath)
      .outputOptions(['-acodec aac', '-vn', '-ac 1', '-ar 16k', '-map_metadata -1'])
      .save(encodedPath)
      .on('end', async () => {
        resolve();
      });
  });
};
await ffmpeg_encode_audio();
const encodedFile = await fsp.readFile(encodedPath);
```

<br>

### Upload the stored audio file onto the firebase storage

---

Uploading the file onto the firebase storage requires the local file path (one in the temporary directory of firebase functions in this case) and the remote file path (one in firebase storage).
I want to access the uploaded audio file by its url and thus generate it here too.

```javascript
const uploadFileLocalPath = encodedPath;
const uploadFileRemotePath = `${recordingId}/audio-${recordChunkNo}.wav`;
const uuid = uuidv4();
const downloadUrl = await bucket
  .upload(uploadFileLocalPath, {
    destination: uploadFileRemotePath,
    metadata: {
      metadata: {
        // setting a token with uuidv4 to play the file externally
        firebaseStorageDownloadTokens: uuid,
      },
    },
  })
  .then(data => {
    const file = data[0];
    const dlPath = encodeURIComponent(file.name);
    return `${STORAGE_ROOT}/${bucket.name}/o/${dlPath}?alt=media&token=${uuid}`;
  })
  .catch(err => {
    throw new Error(err);
  });
```

<br>

### Other features...

---

So, basically that's it!
For future use, I uploaded the generated url to firebase realtime database here.
Also, don't forget to delete the temporary audio files before and after encoding in the end.

```javascript
// uploading the audio url of the stored audio file
await admin.database().ref(`recordings/${recordingId}/${recordChunkNo}/`).update({
  audioUrl: downloadUrl,
});

// delete the local temporary file
fs.unlinkSync(decodedPath);
fs.unlinkSync(encodedPath);
```
