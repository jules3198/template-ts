import './index.css';
import { MyClass } from './example-unit';
import './css/controller.css'
import { WatchController } from './controller/watch-controller';
import { DynamicWatchController } from './controller/dynamic-watch-controller';
import { WatchAnimationController } from './controller/animation';

const a = new MyClass(2);
console.log('number is', a.get());
const dynamicWatchController = new DynamicWatchController();
dynamicWatchController.init();
const watchController = new WatchController();

watchController.generateWatchs(3);


const watchAnimationController = new WatchAnimationController();
watchAnimationController.generateWatch();
watchAnimationController.init();