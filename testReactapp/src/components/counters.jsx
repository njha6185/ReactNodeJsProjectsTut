import React, { } from 'react';
import Counter from './counterUsingClass';

class Counters extends React.Component {
    
    render() {
        const {onReset,onDelete,onIncrement,counters,onDecrement} =this.props;

        return (<div>
            <button onClick={onReset} className="btn btn-success btn-sm m-3">Reset</button>
            {counters.map(
                counter => <Counter key={counter.id}
                    onDelete={onDelete}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    counter={counter}/>
            )}
        </div>);
    }
}

export default Counters;