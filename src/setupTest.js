import { configure } from 'enzyme';
import 'regenerator-runtime/runtime';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
