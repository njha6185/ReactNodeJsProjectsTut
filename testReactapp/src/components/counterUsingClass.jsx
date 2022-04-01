import React, { } from 'react';

class Counter extends React.Component {
    // state = {
    //     value: this.props.counter.value,
    //     tags: []
    // };

    // renderTags() {
    //     if (this.state.tags.length === 0) return <p>There are no Tags</p>;
    //     return this.state.tags.map(tag => <li key={tag}>{tag}</li>);
    // }

    // handleIncrement=()=> {
    //     //console.log("Increment Clicked");
    //     this.setState({ value: this.state.value + 1 });
    // }


    render() {
        //console.log(this.props);
        return (
            <div className="row">
                <div className="col-1">
                    <span className={this.getBadgeClass()}>{this.formatcount()}</span>
                </div>
                <div className="col" >
                    <button style={{ fontSize: 20, width: 40, fontWeight: "bold" }}
                        onClick={() => this.props.onIncrement(this.props.counter)}
                        className="btn btn-primary btn-sm">+</button>

                    <button style={{ fontSize: 20, width: 40, fontWeight: "bold" }}
                        disabled={this.buttonDecEnableDisable()}
                        onClick={() => this.props.onDecrement(this.props.counter)}
                        className="btn btn-secondary btn-sm m-2">-</button>

                    <button
                        onClick={() => this.props.onDelete(this.props.counter.id)}
                        className="btn btn-danger btn-sm">Delete</button>
                </div>

                {/* <ul>
                    {this.state.tags.length === 0 && "Please Create a new Tag"}
                    {this.renderTags()}
                </ul> */}
            </div>
        );
    }

    getBadgeClass() {
        let classes = "badge m-2 bg-";
        classes += this.props.counter.value === 0 ? "warning" : "success";
        //console.log(classes);
        return classes;
    }

    formatcount() {
        const { value: count } = this.props.counter;
        return count === 0 ? "Zero" : count;
    }

    buttonDecEnableDisable() {
        const { value: count } = this.props.counter;
        return count <= 0 ? true : false;
    }
}

export default Counter;