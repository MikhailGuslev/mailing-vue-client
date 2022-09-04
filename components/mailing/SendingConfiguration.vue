<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn>Добавить</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" no-gutters>
        <v-card outlined elevation="2">
          <v-data-table :items="sendings" :headers="dataTableHeader">
            <template #item.messageTemplate.contentType="{ contentType }">
              {{ getContentType(contentType) }}
            </template>
            <template #item.recipients="{ value }">
              {{ getRecipientCount(value) }}
            </template>
            <template #item.messageTemplate="{ item }">
              <v-btn
                icon
                small
                color="primary"
                @click.stop="editMessageTemplate(item)"
              >
                <v-icon small> mdi-file-code </v-icon>
              </v-btn>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon small color="primary" @click="editRecipients(item)">
                <v-icon small> mdi-account-supervisor </v-icon>
              </v-btn>
              <v-btn icon small color="primary" @click="editItem(item)">
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon small color="error" @click="deleteItem(item)">
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <MessageTemplateEditor
      :visible.sync="templateEditorVisible"
      :message-template="selectedSending?.messageTemplate"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DataTableHeader } from 'vuetify'
import MessageTemplateEditor from './MessageTemplateEditorDialog.vue'
import { ContentType } from '~/models/ContentType'
import { EmailSending } from '~/models/EmailSending'

interface ComponentData {
  sendings: EmailSending[]
  dataTableHeader: DataTableHeader[]
  selectedSending: EmailSending | null
  templateEditorVisible: boolean
}

export default defineComponent({
  name: 'SendingConfigurationComponent',
  components: {
    MessageTemplateEditor,
  },

  data(): ComponentData {
    const sendings: EmailSending[] = []
    const dataTableHeader: DataTableHeader[] = [
      { text: '#', value: 'emailSendingId', align: 'center', sortable: false },
      { text: 'Наименование', value: 'name', align: 'center', sortable: false },
      {
        text: 'Число получателей',
        value: 'recipients',
        align: 'center',
        sortable: false,
      },
      {
        text: 'Шаблон',
        value: 'messageTemplate',
        align: 'center',
        sortable: false,
      },
      {
        text: 'Тип содержимого',
        value: 'messageTemplate.contentType',
        align: 'center',
        sortable: false,
      },
      // { text: 'История', value: 'history', align: 'center', sortable: false },
      {
        text: 'Редактирование',
        value: 'actions',
        align: 'center',
        sortable: false,
      },
    ]

    return {
      sendings,
      dataTableHeader,
      selectedSending: null,
      templateEditorVisible: false,
    }
  },

  async mounted() {
    try {
      this.sendings = await this.loadSendings()
      console.log(`sendings loaded - total ${this.sendings.length}`)
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    getContentType(value: number): string {
      return value === ContentType.PlainText ? 'Текст' : 'HTML'
    },

    getRecipientCount(recipients: any): string {
      return recipients == null ? 0 : recipients.length
    },

    async loadSendings(): Promise<EmailSending[]> {
      const endpoint = 'api/Sendings'
      return await this.$axios.$get<EmailSending[]>(endpoint)
    },

    editMessageTemplate(item: EmailSending) {
      this.selectedSending = item
      this.templateEditorVisible = true
    },

    editRecipients() {},

    editItem() {},

    deleteItem() {},
  },
})
</script>
