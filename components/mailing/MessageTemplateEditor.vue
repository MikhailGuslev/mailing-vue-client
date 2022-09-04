<template>
  <v-form ref="editor">
    <v-spacer />
    <!-- IS SUBJECT STATIC  -->
    <v-row no-gutters>
      <v-col>
        <v-switch
          v-model="innerMessageTemplate.isSubjectStatic"
          label="статический заголовок"
        />
      </v-col>
    </v-row>
    <!-- SUBJECT -->
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="innerMessageTemplate.subject"
          outlined
          label="Тема сообщения"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- IS BODY STATIC -->
    <v-row no-gutters>
      <v-col>
        <v-switch
          v-model="innerMessageTemplate.isBodyStatic"
          label="статический контент"
        />
      </v-col>
    </v-row>
    <!-- BODY -->
    <v-row no-gutters>
      <v-col>
        <v-textarea
          v-model="innerMessageTemplate.body"
          outlined
          label="Тело сообщения"
          style="font-family: monospace"
        ></v-textarea>
      </v-col>
    </v-row>

    <!-- CONTENT TYP [PlainText | Html] -->
    <v-row no-gutters>
      <v-col>
        <v-radio-group v-model="innerMessageTemplate.contentType">
          <v-radio label="Текст" :value="0"></v-radio>
          <v-radio label="Html" :value="1"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- MODEL PROVIDER ID -->
  </v-form>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ContentType } from '~/models/ContentType'
import { MessageTemplate } from '~/models/MessageTemplate'

// NOTE: hack
// type VForm = Element & { reset: () => void }

interface ComponentData {
  innerMessageTemplate: MessageTemplate
}

const defaultMessageTemplate: MessageTemplate = {
  subject: 'ddd',
  body: 'ddd',
  isSubjectStatic: true,
  isBodyStatic: true,
  contentType: ContentType.PlainText,
  messageTemplateId: 0,
  modelProvider: {},
}

export default defineComponent({
  name: 'MessageTemplateEditor',
  props: {
    messageTemplate: {
      type: Object as PropType<MessageTemplate | null>,
      default: null,
    },
  },

  data(): ComponentData {
    return {
      innerMessageTemplate: defaultMessageTemplate,
    }
  },

  watch: {
    messageTemplate(newValue: MessageTemplate | null, _) {
      if (newValue != null) {
        this.innerMessageTemplate = newValue
      } else {
        this.innerMessageTemplate = defaultMessageTemplate
      }
    },
    innerMessageTemplate(newValue: MessageTemplate) {
      this.$emit('changed', newValue)
    },
  },
})
</script>
