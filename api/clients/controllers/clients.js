'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 * 
 * https://strapi.io/documentation/3.0.0-beta.x/guides/is-owner.html#limit-the-update
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.owner = ctx.state.user.id;
      entity = await strapi.services.clients.create(data, { files });
    } else {
      ctx.request.body.owner = ctx.state.user.id;
      entity = await strapi.services.clients.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.article });
  },
};
