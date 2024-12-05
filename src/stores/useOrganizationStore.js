import { defineStore } from 'pinia';
import { getOrg } from '../api/orgApi';
import { getServices } from '../api/servicesApi';
import { getWorkers } from '../api/workersApi';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organization: null,
    services: null,
    employees: null,
    images: null,
    reviews: null,
  }),

  actions: {
    async loadOrganization(id) {
      if (!this.organization || this.organization.id !== id) {
        const data = await getOrg(id);
        this.organization = data;
      }
    },
    async loadServices(id) {
      if (!this.services) {
        const data = await getServices(id);
        this.services = data;
      }
    },
    async loadEmployees(id) {
      if (!this.employees) {
        const data = await getWorkers(id);
        this.employees = data;
      }
    },
    /*async loadImages(id) {
      if (!this.images) {
        const data = await getOrgImages(id);
        this.images = data;
      }
    },
    async loadReviews(id) {
      if (!this.reviews) {
        const data = await getOrgReviews(id);
        this.reviews = data;
      }
    },*/
    clearData() {
      this.organization = null;
      this.services = null;
      this.employees = null;
      this.images = null;
      this.reviews = null;
    },
  },
});