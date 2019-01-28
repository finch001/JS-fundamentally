### HOC

 a higher-order component is a function that takes a component and returns a new component.

 ``````js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
 ``````

Don't Mutate the original Component. Use Composition

``````
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
``````

use DisplayName for Easy Debugging

static Methods Must Be Copied Over



