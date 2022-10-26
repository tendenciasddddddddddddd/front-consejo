<template>
  <div class=" liTask mt-1">
    <div class="geist-container editor_live__CSUnb .editor_preview__VbJBs fadeIn1 animate__animated animate__fadeInUp"
      :class="[`animations-${index}`]">
      <div class="entity_entity__QwXps cajasTask">
        <div @click="$emit('nextPage', item._id)" class="geist-container lg-row">
          <div class="jsx-4057886370 geist-container md-row lg-row">
            <div class="d-flex py-1">
              <div  class="d-flex flex-column justify-content-center ms-3">
                <h6 class="mb-0 text-sm negros">
                  {{ item.nombre }}
                </h6>
                <div class="text-sm colorestabla fuente">
                   <div v-if="item.estado">
                    <span style="background-color: rgb(0, 189, 165);" class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                    Entregado
                  </div>
                  <div v-else>
                    <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                   Sin entregar
                  </div>
                </div>
              </div>
              <div class="mt-3 ms-5">
                <span class="text-xs forma" v-if="item.nota===''"> Sin calificación</span>
                <span class="text-xs forma" v-else> Nota: {{item.nota}}</span>
              </div>
            </div>
          </div>
          <div v-if="!$store.state.isAppMobile" class="geist-container sm-row md-row lg-row entity_field__3UFpU entity_last__121tA">
            <div class="geist-container entity_content__ukRDj entity_rightAligned__MnPj3">
              <TimeEgo :fecha="item.fecha" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeEgo from "../shared/TimeEgo";
export default {
  name : 'Items',
  props: { item: Object, index: Number, isSelecUser: Array, },
  components: { TimeEgo },
  data() {
    return {
      isSelecUsers: this.isSelecUser,
    }
  }
}
</script>
<style>

.geist-container {
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 1px;
    max-width: 100%;
    flex: 1;
    justify-content: flex-start;
    align-items: stretch;
}
.editor_live__CSUnb .editor_preview__VbJBs {
    padding: 24px 0;
}
.entity_entity__QwXps {
    position: relative;
    box-sizing: border-box;
}
.entity_field__3UFpU .entity_rightAligned__MnPj3 {
    text-align: right;
    align-items: flex-end;
}
@media screen and (min-width: 961px){
 .geist-container.lg-row {
    flex-direction: row;
    flex-wrap: wrap;
}
}
@media screen and (min-width: 961px){
.geist-container.lg-row>.geist-container {
    margin-left: 0;
}
}
@media screen and (min-width: 961px){
.geist-container.lg-row>.geist-container~.geist-container {
    margin-left: calc(24px * 0.6666666666666666);
}
}
@media screen and (max-width: 600px){
.entity_field__3UFpU .entity_rightAligned__MnPj3 {
    text-align: unset;
    align-items: unset;
}
}
 .forma p {
     font-size: .75rem!important;
 }
</style>