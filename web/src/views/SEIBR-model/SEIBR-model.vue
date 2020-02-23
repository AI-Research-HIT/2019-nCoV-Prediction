<template>
        <iframe ref="iframe" id="introIframe" src="static/intro.htm" frameborder="0" scrolling="yes" ></iframe>
</template>

<script>

    export default {
        data() {
            return {
                bdTokenUrl: 'static/intro.htm',
            }
        },
        created() {
        },
        mounted(){
            /**
             * iframe-宽高自适应显示   
             */
            const oIframe = document.getElementById('introIframe');

            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight;
            // oIframe.style.width = (Number(deviceWidth)-300) + 'px'; //数字是页面布局宽度差值
            // oIframe.style.height = (Number(deviceHeight) * 10) + 'px'; //数字是页面布局高度差
            oIframe.style.width = deviceWidth - Number(deviceWidth)/5 + 'px'; //数字是页面布局宽度差值
            oIframe.style.height = deviceHeight - Number(deviceWidth)/10 + 'px'; //数字是页面布局高度差

            window.onresize = () => {
                return (() => {

                const oIframe = document.getElementById('introIframe');
                const deviceWidth = document.documentElement.clientWidth;
                const deviceHeight = document.documentElement.clientHeight;
                // console.log(deviceWidth)
                // console.log(deviceHeight)
                oIframe.style.width = deviceWidth - Number(deviceWidth)/5 + 'px'; //数字是页面布局宽度差值
                oIframe.style.height = deviceHeight - Number(deviceWidth)/10 + 'px'; //数字是页面布局高度差
                })();
            };
        },
        methods: {
       }
    }
</script>