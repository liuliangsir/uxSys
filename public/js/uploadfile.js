/**
 * Created by wudi on 15/7/28.
 */
var fileData = [];
(function(){
    function upLoadfile(obj) {
        var selectFile = new Resumable({
            target: '/file/upload',
            chunkSize: 10 * 1024 * 1024,
            simultaneousUploads: 8,
            query: {
                realType: obj.type,
                realName: obj.filename || ""
            },
            fileType: [obj.filetype],
            testChunks: false,
            throttleProgressCallbacks: 1
        });

        selectFile.assignBrowse(obj.id[0]);

        selectFile.on('fileAdded', function (file) {
            // Show progress pabr
            var tpl = '<li class="W_uxFlexBox J_ux_'+obj.type+'">' +
                '<div class="W_uxFileBox W_uxFlexBox W_uxFlexItem W_uxFlexItem80" id="' + file.uniqueIdentifier + '">' +
                '<span class="W_uxFlexItem W_uxFlexItem80">' + file.fileName + '</span>' +
                '<span class="W_uxProgressNum W_uxFlexItem">0%</span>' +
                '<div class="W_uxProgressBar"></div>' +
                '</div>' +
                '<a class="W_uxFlexItem W_uxCenter J_uxDelFile W_uxNone" href="javascript:;">删除</a>' +
                '</li>';
            var hasTpl = '<div class="W_uxFileBox W_uxFlexBox W_uxFlexItem W_uxFlexItem80" id="' + file.uniqueIdentifier + '">' +
                '<span class="W_uxFlexItem W_uxFlexItem80">' + file.fileName + '</span>' +
                '<span class="W_uxProgressNum W_uxFlexItem">0%</span>' +
                '<div class="W_uxProgressBar"></div>' +
                '</div>' +
                '<a class="W_uxFlexItem W_uxCenter J_uxDelFile W_uxNone" href="javascript:;">删除</a>';
            var pli = $('.J_ux_'+obj.type+'');
            if (obj.type=='pdf' && pli.length>0) {
                pli.html(hasTpl);
            } else {
                if(obj.type=='pdf'){
                    obj.id.parents('li').before(tpl);
                }else{
                    obj.id.parents('li').after(tpl);
                }

            }
            selectFile.upload();
        });
        selectFile.on('fileSuccess', function (file, message) {
            var $delfiel = $('#' + file.uniqueIdentifier).next('.J_uxDelFile');
            $delfiel.css('display', 'flex');
            var msg = $.parseJSON(message);
            if (msg.success) {
                msg.model.fileEntity = file;
                fileData.push(msg.model);
                $delfiel.data('mid',msg.model._id)

            }

            console.log('success', file, message);
        });
        selectFile.on('fileError', function (file, message) {
            console.log('error', file, message);

        });
        selectFile.on('fileProgress', function (file) {
            var curProgress = Math.floor((file.progress() * 100), 10) + '%';
            $('#' + file.uniqueIdentifier + ' .W_uxProgressBar').width(curProgress);
            $('#' + file.uniqueIdentifier + ' .W_uxProgressNum').html(curProgress);
        });

        return selectFile;
    }


    var pdfFile = upLoadfile({
        id: $('#J_selectPDF'),
        filetype: 'application/pdf',
        type:'pdf'
    });
    var audioFile = upLoadfile({
        id: $('#J_selectAudio'),
        filetype: 'audio/mpeg',
        type:'audio'
    });
    var videoFile =  upLoadfile({
        id: $('#J_selectVideo'),
        filetype: 'video/mp4',
        type:'video'
    });

})()