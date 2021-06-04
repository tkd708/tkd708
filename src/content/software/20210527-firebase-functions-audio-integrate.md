---
layout: post
title: 'Firebase functions - integrating audio files using ffmpeg in firebase functions'
author: [Naoya]
image: ../img/firebase-logo.png
date: '2021-05-27T01:30:00'
draft: false
tags:
  - Firebase
  - ffmpeg
  - Software
excerpt: A use case of firebase functions - integrating audio files using ffmpeg in firebase functions.
---

It's a continuation of the previous blog post on uploading audio files to the firebase storage.
Here I explain how I integrated (just concatenated actually) audio files uploaded during the recording into one long audio file in firebase functions.

<br>

### Get the file list and download the files

---

As I explained in the previous post, there are short audio chunks sent during the recording.
To concatenate them using ffmpeg, I need them all downloaded (and thus the temporary directory in the same way as last time).
So, all the target files (using recordingId in this case) are selected and downloaded into generated local file pathes in the following code chunk.

```javascript
const fetchFileListSelected = async recordingId => {
  // Lists files in the bucket
  const [files] = await bucket.getFiles();
  const filesSelected = files.filter(file => {
    if (file.name.match('full')) return;
    if (file.name.match(recordingId)) return file;
  });
  return filesSelected;
};
const fileListSelected = await fetchFileListSelected(recordingId).catch(console.error);

const downloadAllSelected = async fileListSelected => {
  for (let i = 0; i < fileListSelected.length; i++) {
    const file = fileListSelected[i];
    const number = i + 1;
    const fileNo = ('000' + number).slice(-3);
    const localPath_i = path.join(tempDir, `audio-${fileNo}.wav`);
    const options_i = {
      destination: localPath_i,
    };
    await admin.storage().bucket('langapp-a0ca5.appspot.com').file(file.name).download(options_i);
    const downloadedFile_i = await fsp.readFile(localPath_i);
  }
};
await downloadAllSelected(fileListSelected);
```

<br>

### Concatenate the files using ffmpeg

---

After having all the audio files downloaded, ffmpeg can concatenate them by ".mergeToFile()" after putting by chaining ".input()" as follows.

```javascript
const ffmpeg_merge_audio = () => {
  return new Promise((resolve, reject) => {
    var mergedAudio = ffmpeg();
    for (let i = 0; i < localPathList.length; i++) {
      mergedAudio = mergedAudio.input(localPathList[i]);
    }
    mergedAudio
      .mergeToFile(localPathFullAudio, tempDir)
      .on('error', function (err) {
        console.log('An error occurred: ' + err.message);
      })
      .on('end', async () => {
        resolve();
      });
  });
};
await ffmpeg_merge_audio();
```

<br>

---

As in the previous post, the audio can be uploaded to the firebase storage and its url can be generated for future use.

It's a short post again but here is a way to integrate audio files using ffmpeg in firebase functions!
