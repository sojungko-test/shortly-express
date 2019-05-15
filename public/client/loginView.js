Shortly.LoginView = Backbone.View.extend({
  className: 'login',

  template: Templates['login'],

  initialize: function () {
    $('body').append(this.render().el);
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});