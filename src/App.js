import './App.css';
import React, {Component} from 'react';
import MapComponent from "./Map";

const CATEGORIES = ['date', 'weather', 'Feelings'];

const CategorySelect = ({value, onChange}) => {
    return (
        <select className="select__category" value={value} placeholder="Place categories" onChange={onChange}>
            <option value='none'>-</option>
            {CATEGORIES.map((category) => {
                return (
                    <option value={category} key={category}>
                        {category}
                    </option>
                )
            })}
        </select>
    )
};

const Note = ({note}) => {
    return (
        <div className="note">
            <div>
                <p><b>{note.title}</b> / {note.category}</p>
                <p>{note.value}</p>
            </div>
            {note.markers.length ? <MapComponent markers={note.markers} disabled small/> : null}
        </div>
    );
};

class App extends Component {
    state = {
        title: '',
        note: '',
        category: 'none',
        titleSearch: '',
        categorySearch: 'none',
        searchNotes: [],
        notes: [],
        markers: [],
    };

    addNote = () => {
        this.setState({
            notes: [
                ...this.state.notes,
                {
                    title: this.state.title,
                    value: this.state.note,
                    category: this.state.category,
                    markers: this.state.markers,
                },
            ],
            title: '',
            note: '',
            category: 'none',
            markers: [],
        });
    };

    setNoteTitle = (event) => {
        this.setState({title: event.target.value})
    };

    setNoteText = (event) => {
        this.setState({note: event.target.value});
    };

    setNoteCategory = (event) => {
        this.setState({category: event.target.value})
    };

    search = (event) => {
        this.setState({titleSearch: event.target.value})
    };

    setSearchCategory = (event) => {
        this.setState({categorySearch: event.target.value});
    };

    renderNotes = (notes) => {
        if (notes.length === 0) {
            return (
                <div>
                    <p className="note__simple-text">No Notes</p>
                </div>
            );
        }
        return notes.map((note, index) => {
            return (
                <Note note={note} key={index}/>
            )
        })
    };

    filterNotes = () => {
        return this.state.notes.filter(note =>
           ( note.title.includes(this.state.titleSearch)
            || note.value.includes(this.state.titleSearch))
            && (this.state.categorySearch === 'none' || note.category === this.state.categorySearch)
        );
    };



    render() {
        const filteredNotes = this.filterNotes();

        return (
            <div className="container">
                <header>
                    <p className="tile">Notebooke App</p>
                </header>
                <form className="form-container">
                    <div className="form__inputs">
                        <div className="form-container">
                            <input placeholder="Title"
                                   className="input__note"
                                   type="text"
                                   value={this.state.title}
                                   onChange={this.setNoteTitle} name="title"/>
                            <textarea placeholder="Note"
                                      cols="20" rows="8"
                                      className="input__note"
                                      value={this.state.note}
                                      onChange={this.setNoteText}
                                      name="note"/>
                            <CategorySelect value={this.state.category}
                                            onChange={this.setNoteCategory}/>
                        </div>
                        <MapComponent markers={this.state.markers}
                                      setMarkers={(markers) => this.setState({markers})}/>
                    </div>

                    <input className="add__button"
                           type="button"
                           value="Add Note"
                           onClick={this.addNote}/>
                </form>
                <div>
                    <input  className="input__note"
                            type="text"
                            placeholder="Search Notes"
                            value={this.state.titleSearch}
                           onChange={this.search}
                            name="search"/>
                    <CategorySelect value={this.state.categorySearch}
                                    onChange={this.setSearchCategory}/>
                </div>
                <div>
                    <span className="note__simple-text">Notes:</span>
                    <div>
                        {this.renderNotes(filteredNotes)}
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
