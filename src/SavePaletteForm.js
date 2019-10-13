import React, {Component} from 'react';
import { postFolder, getFolders } from './util/apiCalls'

export class SavePaletteForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          currentFolder: null,
          paletteName: '',
          folderName: '',
          reload: false,
          folders: this.props.folders || null
      };
    }

    handleChangeOfInput = e => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value });
      };

    createNewFolder = async e => {
        e.preventDefault()
        await this.setState({currentFolder: this.state.folderName})
        await postFolder(this.state.folderName)
        let allFolders = await getFolders()
        await this.setState({folders: allFolders})
    }

    setCurrentFolderByClick = (e, folder) => {
        e.preventDefault()
        this.setState({currentFolder: folder})
    }

    displayFolders = () => {
        return this.state.folders.map(folder => {
            return (
            <section>
                <p>{folder.name}</p>
                <button onClick={e => this.setCurrentFolderByClick(e, folder)}>Select</button>
            </section>
            )
        })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.folders !== prevProps.folders) {
          this.setState( { reload: true })
        }
      }

    render() {
        return (
        <form>
            <h1>Save Your Palette</h1>
            <input type='text' placeholder='Enter a name for your palette!' name='paletteName' value={this.state.paletteName} onChange={e => this.handleChangeOfInput(e)}/>
            <div>
                <h1>Select A Folder</h1>
                {this.displayFolders()}
            </div>
            <div>
                <h1>Create a New Folder</h1>
                <input type='text' placeholder='Enter a name for your folder!' name='folderName' value={this.state.folderName} onChange={e => this.handleChangeOfInput(e)}/>
                <button onClick={this.createNewFolder}>Create Folder</button>
            </div>
            <button onClick={(e) => this.props.savePalette(e,this.state.currentFolder, this.state.paletteName)}>Submit!</button>
        </form>
        )
    }
}

export default SavePaletteForm;