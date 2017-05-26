(function(win,doc,$){

    $(function(){
        
        var winH = $(win).height();
        var navbarH = $('.navbar').outerHeight();
        $('.sidebar-wrap').css({
            height: winH - navbarH
        })

        // 初始化二级菜单状态
        var flag = true;

        // 侧边栏子内容触发显示隐藏事件时，添加图标+或-；
        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings().find('.icon-levelone').removeClass('icon-angle-right').addClass('icon-angle-down');
            $(this).siblings('.panel-heading').children('.panel-title').addClass('on');

            // 保存cookie(levels)，记录打开状态
            $.cookie('levels1', $(this).attr('data-index'));
        })

        $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).siblings().find('.icon-levelone').removeClass('icon-angle-down').addClass('icon-angle-right');
            $(this).siblings('.panel-heading').children('.panel-title').removeClass('on');
        })

        // 获取所有一级、二级菜单列表项
        var listItemLevelOne = $('.list-item-levelone');
        var listItemLevelTwo = $('.list-item-leveltwo');

        // 利用事件委托，为当前点击元素添加事件
        $(document).on('click', listItemLevelOne, function(event){

            var target = event.target;
            var siblingsLink = $(target).parent().siblings().children('a');

            // 保存cookie(levels2)，记录当前页面状态
            $.cookie('levels2', $(target).parent().attr('data-index'));

            // 情况一：如果当前点击元素是一级菜单项，且有二级菜单
            if( $(target).hasClass('menu-leveltwo')){
                 $.cookie('levels3', '');
                // 如果有二级菜单已经打开
                if($('.menu-leveltwo').hasClass('active-second')){
                    // 调用方法：复位打开的二级菜单
                    resetSecondMenu();
                }
                // 复位一级菜单样式
                listItemLevelOne.removeClass('active-first');

                // 调用二级菜单切换事件
                toggleIcon($(target));
            } 

            // 情况二：如果当前点击元素是二级菜单项
            if( $(target).hasClass('list-item-leveltwo')){
                // 保存cookie(levels3)，记录当前页面状态
                $.cookie('levels3', $(target).parent().attr('data-index'));

                $(target).addClass('active-third').parent('li').siblings().children('a').removeClass('active-third');
            } 

            // 情况三：如果当前点击元素是一级菜单且没有二级菜单
            if( !$(target).hasClass('menu-leveltwo') && $(target).hasClass('list-item-levelone')){

                // 移除所有已选定的一级菜单状态
                listItemLevelOne.removeClass('active-first');

                // 为当前点击元素添加选定状态
                $(target).addClass('active-first');

                // 如果有二级菜单已经打开
                if($('.menu-leveltwo').hasClass('active-second')){
                    // 调用方法：复位打开的二级菜单
                     resetSecondMenu();
                }                
            }
        })

        // 方法：二级菜单切换
        var toggleIcon = function(self){
            if(flag){
                self.addClass('active-second');
                self.children('.icon-leveltwo').removeClass('icon-angle-right').addClass('icon-angle-down');
                flag = false;
            }else {
                self.removeClass('active-second');
                self.children('.icon-leveltwo').removeClass('icon-angle-down').addClass('icon-angle-right');
                flag = true;
            }
            self.next().stop().slideToggle();
        }

        // 方法：复位打开的二级菜单
        var resetSecondMenu = function (){
            $('.menu-leveltwo').removeClass('active-second');
            $('.menu-leveltwo').next().slideUp();
            $('.menu-leveltwo').children('.icon-leveltwo').removeClass('icon-angle-down').addClass('icon-angle-right');
            flag = true;
            // 二级菜单移除选定样式
            listItemLevelTwo.removeClass('active-third');
        }

        // 个人中心页面
        $('#personCenter').on('click', resetSidebar);
        
        // 重置sidebar状态
        function resetSidebar(){
            $('.icon-levelone').removeClass('icon-angle-down').addClass('icon-angle-right');
            $('.panel-heading').children('.panel-title').removeClass('on');
            $('.panel-collapse').removeClass('in');
            $('.list-item-levelone').removeClass('active-first').removeClass('active-second');
            $('.list-item-leveltwo').removeClass('active-third');
            $.cookie('levels1',null);
            $.cookie('levels2',null);
            $.cookie('levels3',null);
        }

        // 侧边栏防刷新
        var levels1 = $.cookie('levels1');
        var levels2 = $.cookie('levels2');
        var levels3 = $.cookie('levels3') ? $.cookie('levels3') : '';

        var level1Index = levels1;
        var level2Index = levels2.split('-')[1];
        var level3Index = levels3.split('-')[2];

        $('.list-item-levelone').removeClass('active-first');
        $('.panel-collapse').removeClass('in').prev().children('.panel-title').removeClass('on');
        $('.panel-collapse').prev().children('.panel-title').find('.icon-levelone').removeClass('icon-angle-down').addClass('icon-angle-right');
        $('.panel-collapse').eq(level1Index-1).addClass('in').prev().children('.panel-title').addClass('on');
         $('.panel-collapse').eq(level1Index-1).prev().children('.panel-title').find('.icon-levelone').addClass('icon-angle-down')

        var curList = $('.panel-collapse').eq(level1Index-1).find('.list-item-levelone');
        curList.removeClass('active-first');
        curList.eq(level2Index-1).addClass('active-first');
        if(curList.eq(level2Index-1).hasClass('menu-leveltwo')){
            toggleIcon(curList.eq(level2Index-1));
            if(level3Index){
                curList.eq(level2Index-1).next().children('li').eq(level3Index-1).find('.list-item-leveltwo').addClass('active-third')
            }
        }
    })

})(window,document,jQuery)