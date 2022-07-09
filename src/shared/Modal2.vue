<template>
    <div class="s-frame">
                    <div class="s-cuerpo">
                    <div class="s-container">
                        <div class="s-bodys">
                            <div class="s-opciones">
                              <div class="s-headers">cabeza</div>
                            </div>

                            <div class="s-cards">
                                sdfghj
                            </div>
                        </div>
                    </div>
                </div>
                </div>
</template>

<script>
export default {

}
</script>

<style>
.s-frame{
  bottom: 0;
    left: auto;
    max-height: 100%;
    right: 0;
    position: fixed;
    top: 50px;
    width: 500px;
}
.s-cuerpo{
    align-items: center;
    background: transparent;
    cursor: pointer;
    display: flex;
    flex-direction: column-reverse;
    font-family: "Muli", sans-serif;
    height: 100%;
    justify-content: center;
    margin: 0;
    padding: 0;
}
.s-opciones{
    background: rgb(14, 114, 237);
    height: 66px;
    padding: 0px 16px;
    color: #fff;
}
.s-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 0px 10px 0 rgb(0 0 0 / 30%);
    color: #2F4858;
    cursor: default;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    line-height: 28px;
    max-height: calc(100% - 20px);
    max-width: calc(100% - 40px);
    overflow: hidden;
    position: relative;
    transition: opacity 0.3s, transform 0.3s;
    width: 750px;
}
.s-bodys{
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.s-headers{
     align-items: center;
    display: flex;
    margin: 20px 5px 15px;
    padding: 0 30px;
}
.s-cards{
    display: block;
    margin: 0px 10px 20px;
    height: 100vh;
    overflow-y: auto;
    padding: 0px 30px;
}
</style>