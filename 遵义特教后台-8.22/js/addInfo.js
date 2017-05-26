 (function(){
    /** 
    * 添加关键词方法
    * 1.triggerElName：触发事件的元素对象
    * 2.triggerModalName：触发事件对应的弹框对象
    * 3.tableListEl：显示的table列表
    * 4.modalTextName01：弹框中第一个输入框
    * 5.modalTextName02：弹框中第二个输入框（可选）
    */
    var addInfo = function(triggerElName, triggerModalName, tableListEl, modalTextName01, modalTextName02){

        var erroeMsg = $(triggerModalName).find('.error-message');

        $(triggerElName).on('click',function(){
            $(triggerModalName).modal();
        })

        // 获取操作单元格中的按钮组
        var btnLists = $(tableListEl).find('tr').eq(1).find('td').last().html();

        $(triggerModalName).find('.sure-add').on('click',function(){

            // 获取表格中一行包含的单元格数量
            var cols = $(tableListEl).find('tr').eq(1).find('td').size();

            // 如果弹框中只有一个文本输入框的情况
            if( !modalTextName02 ){
                // 为空判断
                if( $(triggerModalName).find(modalTextName01).eq(0).val().replace(/(^\s*)|(\s*$)/g, "").length !== 0 ){

                    $(triggerModalName).modal('hide');                    
                    var maxIndex = $(tableListEl).find('tr').last().find('td').first().text();

                    // 表格中插入模块类别
                    var _html = '<tr><td>'+ (maxIndex*1+1) +'</td><td>'+$(triggerModalName).find(modalTextName01).eq(0).val()
                    +'</td><td>'+ btnLists +'</td></tr>';

                    $(tableListEl).append(_html); 

                    // 清空
                    $(triggerModalName).find(modalTextName01).eq(0).val('');

                }else {
                    erroeMsg.text('不能为空！');
                }                    
            } 
            //如果弹框中存在两个文本输入框
            if( modalTextName02 ) {  
                // 为空判断
                if( ($(triggerModalName).find(modalTextName01).eq(0).val().replace(/(^\s*)|(\s*$)/g, "").length !== 0) &&　($(triggerModalName).find(modalTextName02).eq(0).val().replace(/(^\s*)|(\s*$)/g, "").length !== 0) ){

                    $(triggerModalName).modal('hide');
                    // var maxIndex = $(tableListEl).find('tr').last().find('td').first().text();
                    var val01 = $(triggerModalName).find(modalTextName01).eq(0).val();
                    var val02 = $(triggerModalName).find(modalTextName02).eq(0).val();

                    if(cols == 3){
                        // 表格中插入模块类别
                        var _html = '<tr><td>'+ val01 +'</td><td>'+ val02 +'</td><td>'+ btnLists +'</td></tr>';
                    }
                    if(cols == 4){
                        var maxIndex = $(tableListEl).find('tr').last().find('td').first().text();
                        // 表格中插入模块类别
                        var _html = '<tr><td>'+ (maxIndex*1+1) +'</td><td>'+ val01 +'</td><td>'+ val02 +'</td><td>'+ btnLists +'</td></tr>';                        
                    }

                    $(tableListEl).append(_html); 

                    // 清空
                    $(triggerModalName).find(modalTextName01).eq(0).val('');
                    $(triggerModalName).find(modalTextName02).eq(0).val('');

                }else {
                    erroeMsg.text('不能为空！');
                } 
            }
        })
        // 弹框消失事件
        $(triggerModalName).on('hidden.bs.modal', function (e) {
            if(!modalTextName02){
               $(triggerModalName).find(modalTextName01).val('');                    
            }else {
               $(triggerModalName).find(modalTextName01).val(''); 
               $(triggerModalName).find(modalTextName02).val('');
            }
           $('.error-message').text('');
        })

        $(triggerModalName).find(modalTextName01).on('keydown',function(){
             erroeMsg.text('');
        }).on('blur',function(){
            if( $(triggerModalName).find(modalTextName01).val().replace(/(^\s*)|(\s*$)/g, "").length == 0 ){
                erroeMsg.text('不能为空！');
            }
        })
    }
    window.addInfo = addInfo;    
 })()