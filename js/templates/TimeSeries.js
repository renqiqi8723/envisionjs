(function () {

var
  V = envision;

function getDefaults () {
  return {
    detail : {
      name : 'envision-timeseries-detail',
      flotr : {

      }
    },
    summary : {
      name : 'envision-timeseries-summary',
      flotr : {
        handles : {
          show : true
        },
        selection : {
          mode : 'x'
        },
        yaxis : {
          autoscale : true,
          autoscaleMargin : 0.1
        }
      }
    },
    connection : {
      name : 'envision-timeseries-connection',
      drawing : V.QuadraticDrawing
    }
  };
}

/*
function getDefaults (options, defaults) {
  var o = _.defaults(options, defaults);
  o.flotr = _.defaults(o.flotr, defaults.flotr);
  return o;
}
*/

function TimeSeries (options) {

  var
    data = options.data,
    defaults = getDefaults(),
    vis = new V.Visualization({name : 'envision-finance'}),
    selection = new V.Interaction(),
    detail, summary, connection;

  if (options.defaults) {
    defaults = Flotr.merge(defaults, options.defaults);
  }

  defaults.detail.data = data.detail;
  defaults.summary.data = data.summary;
  detail = new V.Child(defaults.detail);
  connection = new V.Child(defaults.connection);
  summary = new V.Child(defaults.summary);

  // Render visualization
  vis
    .add(detail)
    .add(connection)
    .add(summary)
    .render(options.container);

  // Selection action
  selection
    .add(V.action.selection)
    .follower(detail)
    .follower(connection)
    .leader(summary);

  this.vis = vis;
  this.selection = selection;
  this.detail = detail;
  this.summary = summary;
};

V.templates.TimeSeries = TimeSeries;

})();
