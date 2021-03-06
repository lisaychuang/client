import Service, { inject } from '@ember/service';
import { task } from 'ember-concurrency';

export const lists = {
  hidden: {
    method: 'hiddenAddons',
    title: 'Hidden Addons',
  },
  'needing-categorization': {
    method: 'addonsNeedingCategorization',
    title: 'Addons needing categorization',
  },
  'needing-rereview': {
    method: 'addonsNeedingReReview',
    title: 'Addons needing re-review',
  },
  'needing-review': {
    method: 'addonsNeedingReview',
    title: 'Addons needing review',
  },
  'wip': {
    method: 'addonsWip',
    title: 'Addons marked WIP'
  },
  'missing-repo-url': {
    method: 'missingRepoUrl',
    title: 'Addons without a repo url set'
  },
  'invalid-repo-url': {
    method: 'invalidRepoUrl',
    title: 'Addons marked as invalid repo url'
  }
};
export default Service.extend({
  store: inject(),
  find: task(function* (listParam) {
    let list = lists[listParam];
    let addons = yield this[list.method]();
    return {
      addons,
      title: list.title,
      key: listParam,
    }
  }),
  addonsNeedingCategorization() {
    return this.get('store').query('addon', { filter: { isWip: false, notCategorized: true, hasRepoUrl: true }, sort: '-latestVersionDate' });
  },
  hiddenAddons() {
    return this.get('store').query('addon', { filter: { hidden: true }, sort: '-latestVersionDate' });
  },
  addonsNeedingReReview() {
    return this.get('store').query('addon', { filter: { needsReReview: true, hasRepoUrl: true }, sort: '-latestVersionDate' });
  },
  addonsNeedingReview() {
    return this.get('store').query('addon', { filter: { notReviewed: true, isWip: false, hasRepoUrl: true }, sort: '-latestVersionDate' });
  },
  addonsWip() {
    return this.get('store').query('addon', { filter: { isWip: true }, sort: '-latestVersionDate' });
  },
  missingRepoUrl() {
    return this.get('store').query('addon', { filter: { missingRepoUrl: true }, sort: '-latestVersionDate' });
  },
  invalidRepoUrl() {
    return this.get('store').query('addon', { filter: { invalidRepoUrl: true }, sort: '-latestVersionDate' });
  }
});
