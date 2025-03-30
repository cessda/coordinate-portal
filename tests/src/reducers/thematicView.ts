import reducer from "../../../src/reducers/thematicView";
import { ThematicView, thematicViews, esIndex } from '../../../src/utilities/thematicViews';
const initialView = thematicViews.find((tv) => tv.path === "/") as ThematicView;
const initialIndex =  initialView.esIndexes.find((i) => i.indexName === initialView.defaultIndex ) as esIndex;

const newView = thematicViews.find((tv) => tv.path === "/coordinate") as ThematicView;
const newIndex = newView.esIndexes.find((i) => i.indexName === newView.defaultIndex ) as esIndex;

describe('Thematic View reducer', () => {

    it('should return the initial state', () => {
     
        expect(reducer(undefined, { type: 'unknown' })).toEqual(
            { 
                currentIndex: initialIndex,
                list: thematicViews,
                currentThematicView: initialView,
                 }
          )
    });
    
});