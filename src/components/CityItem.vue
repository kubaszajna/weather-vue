<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Do you really want to delete this city?"
      md-content
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
    <md-card class="card-header">
      <md-card-header>
        <div class="md-title" style="font-size: 1.1em;">
          {{ city.name }}, {{ city.sys.country }}
          <md-button class="md-fab md-mini md-primary">
            <router-link
              :to="{ name: 'CityCharts', params: { id: city.id } }"
              class="md-icon md-icon-font md-theme-default"
              >show_chart</router-link
            >
          </md-button>
        </div>
      </md-card-header>

      <md-card-actions>
        <md-button
          class="md-fab md-mini md-alignment-left"
          style="margin-right: 28%;"
          v-if="isDeletable"
          @click="active = true"
        >
          <md-icon>delete</md-icon>
        </md-button>
        <router-link
          tag="md-button"
          :to="{ name: 'city', params: { id: city.id } }"
          >View details</router-link
        >
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "CityItem",
  props: {
    city: Object,
    isDeletable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    onConfirm() {
      this.$emit("remove", this.city.id);
    },
    onCancel() {}
  }
};
</script>

<style scoped>
div {
  border-radius: 15px;
}

div .md-button {
  top: -5px;
  float: right;
}

.card-header {
  background: #2c3e50;
}

.md-card-actions .md-button {
  float: left;
}

#details {
  float: right;
  display: block;
}

.md-icon {
  text-decoration: none !important;
}

.md-card-actions {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
</style>
