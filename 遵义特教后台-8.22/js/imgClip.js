function change() {
    // 弹框
    $('#uploadModal').modal();

    var pic = document.getElementById("previewImg1"),
        pic2 = document.getElementById("previewImg2"),
        file = document.getElementById("fileUpload");

    var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();

     // gif在IE浏览器暂时无法显示
     if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
         alert("图片的格式必须为png或者jpg或者jpeg格式！"); 
         return;
     }
     var isIE = navigator.userAgent.match(/MSIE/)!= null,
         isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;

     if(isIE) {
        file.select();
        var reallocalpath = document.selection.createRange().text;

        // IE6浏览器设置img的src为本地路径可以直接显示图片
         if (isIE6) {
            pic.src = reallocalpath;
            pic2.src = reallocalpath;
            initImgClip();
         }else {
            // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
             pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
             pic2.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
             // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
             pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
             pic2.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
             initImgClip();
         }
     }else {
        html5Reader(file);
     }
}

function html5Reader(file){
 var file = file.files[0];
 var reader = new FileReader();
 reader.readAsDataURL(file);
 reader.onload = function(e){
    var pic = document.getElementById("previewImg1");
    var pic2 = document.getElementById("previewImg2");
    pic.src=this.result;
    pic2.src=this.result;
 }
}

// 弹框完成后初始化裁切
$('#uploadModal').on('shown.bs.modal', function(){
    // 初始化裁切
    setTimeout(function(){
        initImgClip($('#previewImg1'));
        var _selection = {
            x1:'0',
            y1:'0',
            x2:'200',
            y2:'150',
            width:'200',
            height:'150'
        };
        preview(_selection)
    }, 500)
});

// 图片裁切
function initImgClip(pic){
    var data = {
        x1:'',
        y1:'',
        x2:'200',
        y2:'150',
        imgW:'200',
        imgH:'150'
    };
    var ias = pic.imgAreaSelect({
        aspectRatio:'4:3',
        handles: true,
        fadeSpeed: 1,
        handles:true,
        x1:0,
        y1:0,
        x2:200,
        y2:150,
        instance: true,
        onSelectEnd: function(img,selection){
            // 预览
            preview(selection);

            // 添加数据
            data.x1   = selection.x1;
            data.y1   = selection.y1;
            data.x2   = selection.x2;
            data.y2   = selection.y2;
            data.imgW = selection.width;
            data.imgH = selection.height;
        }
    });
    // 图片裁切
    function clipImg(datas){

        var cavs = document.createElement('canvas');
        var ctx = cavs.getContext('2d');

        // 设置宽高
        cavs.width = datas.imgW;
        cavs.height = datas.imgH;

        var naturalW = pic[0].naturalWidth;
        // console.log(naturalW);
        var scaleX = pic.width()/naturalW;

        ctx.clearRect(0, 0, cavs.width, cavs.height);
        ctx.save();

        ctx.drawImage(pic[0], datas.x1/scaleX, datas.y1/scaleX, datas.imgW/scaleX, datas.imgH/scaleX, 0, 0, datas.imgW,datas.imgH);

        var dataURL = cavs.toDataURL('jpg', 1);
        // base64
        // console.log(dataURL); naturalWidth
        ctx.restore();
        $('#img-thumbnail').attr('src',dataURL);
    }  
    // 确定裁切
    $(document).on('click','#btn-ok',function(){
        clipImg(data);
        $('#uploadModal').modal('hide');
    })
     $('#uploadModal').on('hide.bs.modal', function(){
        ias.cancelSelection();
     });
}
//图片预览
function preview(selection) {
    if (!selection.width || !selection.height)
        return;

    var scaleX = 200 / selection.width;
    var scaleY = 150 / selection.height;
    var hei = $('#previewImg1').height();
    var wid = $('#previewImg1').width();

    $('#preview2 img').css({
        width: Math.round(scaleX * wid),
        height: Math.round(scaleY * hei),
        marginLeft: -Math.round(scaleX * selection.x1),
        marginTop: -Math.round(scaleY * selection.y1)
    });
} 