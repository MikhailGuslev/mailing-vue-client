<template>
  <v-row justify="center" align-content="center">
    <v-col cols="12">
      <v-card>
        <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab v-for="item in items" :key="item.tabKey">
            {{ item.tabTitle }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tabKey">
            <v-card flat>
              <v-card-text>
                <SendingSchedule
                  v-if="item.tabKey === 'SendingSchedule'"
                ></SendingSchedule>
                <SendingConfiguration
                  v-if="item.tabKey === 'SendingConfiguration'"
                ></SendingConfiguration>
                <div v-if="item.tabKey === 'MessageTemplate'">
                  Шаблоны рассылок + поставщики моделей данных
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import SendingSchedule from '~/components/mailing/SendingSchedule.vue'
import SendingConfiguration from '~/components/mailing/SendingConfiguration.vue'

export default Vue.extend({
  name: 'MailingPage',
  components: { SendingSchedule, SendingConfiguration },
  data() {
    return {
      tab: null,
      items: [
        { tabKey: 'SendingSchedule', tabTitle: 'Расписание рассылок' },
        {
          tabKey: 'SendingConfiguration',
          tabTitle: 'Конфигурация рассылок',
        },
        {
          tabKey: 'MessageTemplate',
          tabTitle: 'Шаблоны сообщений',
        },
      ],
    }
  },
})
</script>
