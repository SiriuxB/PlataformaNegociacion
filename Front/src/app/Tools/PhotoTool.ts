declare function unescape(s: string): string;
export class PhotoTool {



    public static dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }
    constructor() { }


    public static plauvideo() {

        var canvas: any = document.getElementById('canvas');
        var video: any = document.getElementById('video');
        var FrontCameraSelected: any
        navigator.mediaDevices.enumerateDevices()
            .then(gotDevices).then(getStream).catch(handleError);


        function gotDevices(deviceInfos) {
            for (var i = 0; i !== deviceInfos.length; ++i) {
                var deviceInfo = deviceInfos[i];
                if (deviceInfo.kind === 'videoinput') {
                    FrontCameraSelected = deviceInfo.deviceId;
                    break
                } else {
                    console.log('Found one other kind of source/device: ', deviceInfo);
                }
            }
        }
        function getStream() {
            var constraints = {
                video: {
                    deviceId: { exact: FrontCameraSelected }
                }
            };

            navigator.mediaDevices.getUserMedia(constraints).
                then(gotStream).catch(handleError);
        }

        function gotStream(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

        function handleError(error) {
            console.log('Error: ', error);
        }

    }

    public static plauvideoWithCameraSelection(CameraNumber: number = 1) {
        var videoElement: any = document.querySelector('video');
        navigator.mediaDevices.enumerateDevices()
            .then(gotDevices).then(getStream).catch(handleError);
      
        var number = 0
        var selectedDevice
        function gotDevices(deviceInfos) {
            for (var i = 0; i !== deviceInfos.length; ++i) {
                var deviceInfo = deviceInfos[i];
                if (deviceInfo.kind === 'videoinput') {
                    number += 1 
                   if( CameraNumber==number)
                   {selectedDevice = deviceInfo.deviceId; }
                   
                } else {
                    console.log('Found one other kind of source/device: ', deviceInfo);
                }
            }
        }
        function getStream() {
            var constraints = {
                video: {
                    deviceId: { exact: selectedDevice }
                }
            };

            navigator.mediaDevices.getUserMedia(constraints).
                then(gotStream).catch(handleError);
        }
        var canvas: any = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var video: any = document.getElementById('video');
        function gotStream(stream) {
            videoElement.src = window.URL.createObjectURL(stream);
        }

        function handleError(error) {
            console.log('Error: ', error);
        }

    }
}