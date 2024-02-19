# react-shallow-snapshot

Library for maintaining tools to allow simple unit testing of React apps.

The purpose of this library is to support testing patterns for react apps that focus on isolated unit tests and component snapshots.
It provides a shallow renderer similar to Enzyme's, build from `react-test-renderer`, as well as a number of utilities focused on providing support for a react unit-testing ecosystem

## Utilities

### `shallow` - Shallow Renderer
Provides a shallow render of a given react component.  
#### Usage
import renderer
```js
import { shallow } from '@edx/react-unit-test-utils';
```
Mock local components for shallow rendering
```js
jest.mock('./LocalComponent', () => 'LocalComponent');
```
Mock used component libraries (such as paragon) using provide `mockComponents` utility (see below).

Generate render element
```js
const el = shallow(<MyComponent {...props} />);
```
Validate snapshots
```js
expect(el.snapshot).toMatchSnapshot();
expect(el.instance.findByType(LocalComponent)[0].snapshot).toMatchSnapshot();
```
Inspect rendered component props and children.
```js
const localChild = el.instance.findByType(LocalComponent)[0];
const localDiv = el.instance.findByType('div')[0];
const localTestEl = el.instance.findByType('my-test-id')[0];
// returned object is of the shape { props, type, children }
expect(localChild.props.label).toEqual(myLabel);
expect(localDiv.children[0].type).toEqual('h1');
expect(localDiv.children[0].matches(<h1>My Header</h1>)).toEqual(true);
```

### `mockComponents` - Component library mocking utility
Component library mocking utility intended for imported libraries of many complex components to be mocked.

#### Usage
```js
jest.mock('@edx/paragon', () => jest.requireActual('@edx/react-unit-test-utils').mockComponents({
  Button: 'Button',
  Icon: 'Icon',
  Form: {
    Group: 'Form.Group',
    Control: 'Form.Control',
  },
}));

// Provides mocks for <Button>, <Icon>, <Form>, <Form.Group>, and <Form.Control> with appropriate mocks to appear legibly in the snapshot.
```
