Blocks = new Mongo.Collection('Blocks');

if (Meteor.isClient) {
  function getGridstackHooks(gridstack) {
    return {
      insertElement: (node) => {
        let data = Blaze.getData(node);

        gridstack.add_widget(node,
          node.x, node.y, node.width, node.height, data.auto_position);
      },
      moveElement: function() {
      },
      removeElement: function(node) {
        console.log('_gridstack_node data has already been removed here')
        console.log($(node).data('_gridstack_node'));
        gridstack.remove_widget(node);
      }
    };
  }


  Template.grid.onRendered(function() {
    let $gridstackDiv = this.$('.grid-stack').gridstack({
      float: true
    });

    this.gridstack = $gridstackDiv.data('gridstack');

    //$gridstackDiv.on('change', widgetResizeAndMoveHandler);
    $gridstackDiv.get(0)._uihooks = getGridstackHooks(this.gridstack);
  });


  Template.grid.helpers({
    getWidgets: function() {
      return Blocks.find();
    },
    getAddWidget: function() {
    }
  });

  Template.hello.events({
    'click button': function() {
      Blocks.insert({
        width: 3,
        height:3,
        auto_position: true,
        text: 'foo'
      });
    }
  });

  Template.grid_widget.onRendered(function() {
    console.log('_gridstack_node data for block:')
    console.log($(this.lastNode).data('_gridstack_node'));
  });

  Template.grid_widget.events({
    'click .widget': function(event, templateInstance) {
      Blocks.remove(templateInstance.data._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function() {
  });
}
