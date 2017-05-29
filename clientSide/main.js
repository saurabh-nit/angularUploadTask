angular.module('myUpload', ['ngFileUpload'])
.controller('Task',['Upload','$window',function(Upload,$window){
    var currentUpload = this;
    currentUpload.submit = function(){                     //FUNCTION CALL ON FORM SUBMIT
        if (currentUpload.upload_form.file.$valid && currentUpload.file) {  //CHEXK FOR VALID FORM
            currentUpload.upload(currentUpload.file);
        }
    }

    currentUpload.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/upload',       //API ADDRESS
            data:{file:file}                         //PASSING FILE AS DATA
        }).then(function (response) {
          console.log('************',response);
            if(response.data.error == false){
                alert('Success : ' + response.data.file[0].filename + ' uploaded successfully.');
            } else {
                alert('Error in Uploading file.');
            }
        }, function (response) { //catch error
            console.log('Error status: ' + response.status);
        }, function (evt) {
            console.log('-----', evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            currentUpload.progress = 'Upload Status : ' + progressPercentage + '% '; 
        });
    };
}]);
