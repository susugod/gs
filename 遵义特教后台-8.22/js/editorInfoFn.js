(function(){
    
    /**
     * 角色编辑方法
     * triggerElName：触发事件的元素对象；
     * triggerModalName：触发事件后的弹框对象；
     * tableListName：显示的table列表
     * modalTextName01：弹框中第一个输入框
     * modalTextName02：弹框中第二个输入框（可选）
     */
    function editorInfoFn(triggerElName, triggerModalName, tableListName, modalTextName01, modalTextName02){

        // 初始化当前点击元素在表格中所在行的索引
        var curIndex = 0;

        // 编辑按钮点击事件
        $(document).on('click', triggerElName, function(){

            $('.error-message').text('');
            curIndex = $(this).parents('tr').index(); 

            // 如果不存在第二个选项             
            if(!modalTextName02){     
                // 获取当前编辑按钮对应的内容
                var curName01 = $(this).parent().prev();
                var curVal01 = curName01.text();
                // 把获取的内容添加到弹框中
                var textInputVal01 = $(triggerModalName).find(modalTextName01).eq(0);
                textInputVal01.val(curVal01);                       
            } else {
                // 获取当前编辑按钮对应的内容
                var curName01 = $(this).parent().prev().prev();
                var curName02 = $(this).parent().prev();
                var curVal01 = curName01.text();
                var curVal02 = curName02.text();
                // 把获取的内容添加到弹框中
                var textInputVal01 = $(triggerModalName).find(modalTextName01).eq(0);
                var textInputVal02 = $(triggerModalName).find(modalTextName02).eq(0);
                textInputVal01.val(curVal01);  
                textInputVal02.val(curVal02);  
            }

            // 弹框
            $(triggerModalName).modal();
        })

        // 弹框中确定按钮点击事件
        $(triggerModalName).find('.sure-add').on('click', function(){

            // 如果不存在第二个选项 
            if(!modalTextName02){
                // 获取弹框中角色名称对应文本框
                var textInputVal01 = $(triggerModalName).find(modalTextName01).eq(0);

                if( textInputVal01.val().replace(/(^\s*)|(\s*$)/g, "").length !== 0){

                    // 表格中对应位置更新内容
                    $(tableListName).find('tr').eq(curIndex).find('td').eq(1).text(textInputVal01.val());

                    // 弹框隐藏
                    $(triggerModalName).modal('hide');

                    // 重置文本框内容
                    textInputVal01.val('');

                }else {
                    $('.error-message').text('不能为空！');
                }
            }else { //如果存在第二项
                // 获取弹框中角色名称对应文本框
                var textInputVal01 = $(triggerModalName).find(modalTextName01).eq(0);
                var textInputVal02 = $(triggerModalName).find(modalTextName02).eq(0);

                if( (textInputVal01.val().replace(/(^\s*)|(\s*$)/g, "").length !== 0) && (textInputVal02.val().replace(/(^\s*)|(\s*$)/g, "").length !== 0)){

                    // 表格中对应位置更新内容
                    $(tableListName).find('tr').eq(curIndex).find('td').last().prev().prev().text(textInputVal01.val());
                    $(tableListName).find('tr').eq(curIndex).find('td').last().prev().text(textInputVal02.val());

                    // 弹框隐藏
                    $(triggerModalName).modal('hide');

                    // 重置文本框内容
                    textInputVal01.val('');
                    textInputVal02.val('');

                }else {
                    $('.error-message').text('不能为空！');
                }
                
            }
        })

        // 删除按钮点击事件
        $(document).on('click', '.con-remove', function(){
            $(this).parents('tr').remove();
        })            
    }
    window.editorInfoFn = editorInfoFn;
})()