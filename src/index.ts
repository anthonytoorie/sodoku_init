import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon } from '@nodegui/nodegui';
import logo from '../assets/logox200.png';
import SodokuGame from './SodokuAPI/SodokuGame';


const win = new QMainWindow();
win.setWindowTitle("Hello World");

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const label = new QLabel();
label.setObjectName("mylabel");
label.setText("Hello");

const button = new QPushButton();
button.setIcon(new QIcon(logo));

const label2 = new QLabel();
label2.setText("World");
label2.setInlineStyle(`
  color: red;
`);

rootLayout.addWidget(label);
rootLayout.addWidget(button);
rootLayout.addWidget(label2);
win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: #009688;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
    #mylabel {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
    }
  `
);
win.show();

(global as any).win = win;

const game = new SodokuGame(9);
game.populateBoard(["unsolved", "unsolved", "unsolved", "unsolved", 4, 7, 2, 8, 9, "unsolved", 1, "unsolved", "unsolved", "unsolved", "unsolved", 3, "unsolved", "unsolved", "unsolved", "unsolved", "unsolved", 6, 9, 3, "unsolved", "unsolved", 7, 9, "unsolved", 3, "unsolved", "unsolved", "unsolved", "unsolved", "unsolved", "unsolved", "unsolved", "unsolved", "unsolved", "unsolved", "unsolved", "unsolved", 4, "unsolved", 5, "unsolved", "unsolved", 1, "unsolved", "unsolved", 4, 7, "unsolved", "unsolved", "unsolved", 3, 2, "unsolved", "unsolved", "unsolved", "unsolved", 1, "unsolved", 6, 8, 7, 9, "unsolved", "unsolved", "unsolved", 4, "unsolved", "unsolved", "unsolved", "unsolved", 8, 5, "unsolved", "unsolved", "unsolved", "unsolved"]);
game.printGroups();
console.log(game.unsolvedSodokuBlocks);



/*
const possibilities = [[1,5],[1,6],[3,2]];

const recursePossibilities = (possibilitiesArrayOfArrays,arrayFocusIndexNumber,pathBuilderArray) => {


}*/

/*
get all possibilities to fill out puzzle initially for unsolved

isPossible(puzzle,x,y,val)
*/
