<template>
  <v-dialog v-model="dialogVisible" persistent max-width="600" scrollable>
    <v-card>
      <v-card-title class="text-h5"> Редактирование шаблона </v-card-title>
      <v-card-text v-if="internalMessageTemplate != null">
        <MessageTemplateEditor :message-template="internalMessageTemplate" />
      </v-card-text>
      <v-card-text v-if="internalMessageTemplate == null">
        Отсутствуют данные для редактирования
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="internalMessageTemplate == null"
          color="green darken-1"
          text
          @click="
            () => {
              $emit('update:visible', false)
              dialogVisible = false
            }
          "
        >
          Применить
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="
            () => {
              $emit('update:visible', false)
              dialogVisible = false
            }
          "
        >
          Отмена
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MessageTemplateEditor from './MessageTemplateEditor.vue'
import { MessageTemplate } from '~/models/MessageTemplate'

export default defineComponent({
  name: 'MessageTemplateEditorDialog',
  components: { MessageTemplateEditor },
  props: {
    visible: {
      type: Boolean,
      default: false,
      requeired: true,
    },
    messageTemplate: {
      type: Object as PropType<MessageTemplate | null>,
      default: null,
    },
  },
  data() {
    return {
      internalMessageTemplate: this.messageTemplate,
      dialogVisible: this.visible,
    }
  },

  watch: {
    visible(newValue: boolean, _) {
      this.dialogVisible = newValue
      this.internalMessageTemplate = null

      if (this.messageTemplate != null) {
        const clone = JSON.stringify(this.messageTemplate)
        this.internalMessageTemplate = JSON.parse(clone) as MessageTemplate
      }
    },
  },
})
</script>
