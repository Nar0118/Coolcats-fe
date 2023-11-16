import React, { useContext, useState , useRef } from 'react';
import { UserContext } from "../../../context/UserContext";
import { StatusMessageContext } from "../../../context/StatusMessage";
import { StatusContext, EnumStatus } from "../../../context/Status";
import { IEditableInput, NftListType, NFT, IProfileContainerList } from '../../../types/interfaces';
import Container from '../../Container';
import { ContainerList } from '../../List';
import { AuthContext } from '../../../context/Auth';

function EditableInput({ editMode, name, type, value, label, error }: IEditableInput) {
  let lbl = label;
  if (!lbl) {
    lbl = name;
  }

  if (!editMode) {
    return (
      <Container className='form-element form-element--static'>
        <label htmlFor={ name }>{ lbl }</label>
        <p>{ value }</p>
      </Container>
    );
  }

  if (!type) {
    type = 'text';
  }

  let iProps = {} as any;
  iProps.type = type;
  iProps.name = name;

  if (type === 'checkbox') {
    iProps.defaultChecked = value;
  } else {
    iProps.defaultValue = value;
  }

  return (
    <Container className='form-element'>
      <label htmlFor={ name }>{ lbl }</label>
      { type !== 'textarea' && <input {...iProps} /> }
      { type === 'textarea' && <textarea {...iProps} cols={ 5 } rows={ 5 } /> }
      { error && <span className='red'>* Invalid, please check and try again</span> }
    </Container>
  );
}

function ProfileContainerList({ type }: IProfileContainerList) {
  const { userData, setUserProfileImage, updateUserData } = useContext(UserContext);
  
  let selected = false;
  if (userData.profilepicture
    && userData.profilepicture.type === type
  ) {
    selected = userData.profilepicture;
  }

  const selectProfilePic = (nft: NFT, type: NftListType) => {
    setUserProfileImage({
      type: type,
      nft: nft
    });

    if (type === NftListType.CATS) {
      updateUserData({
        profilepicturecatid: nft.id
      });
    }
  };

  return (
    <ContainerList selectedNft={ selected } type={ type } onClick={ (nft: NFT) => selectProfilePic(nft, type) } />
  );
};

function ProfilePictureChooser() {
  const { userData, setUserProfileImage } = useContext(UserContext);
  const { setStatusMessage } = useContext(StatusMessageContext);
  const grey = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  const [ selectType, setSelectType ] = useState<boolean>(false);

  const toggleSelectType = () => {
    setSelectType(!selectType);
  };

  const openSelectType = () => {
    setSelectType(true);
  };

  const showCatSelection = () => {
    setStatusMessage({
      type: 'info',
      message: (
        <ProfileContainerList type={ NftListType.CATS } />
      ),
      callback: toggleSelectType
    });
  };

  let profilepicturesrc;
  if (userData.profilepicture) {
    profilepicturesrc = userData.profilepicture.nft.image;
  }

  return (
    <Container className='userprofile-image' states={ [{className: 'open', condition: selectType}] }>
      <img height='400' width='400' src={ profilepicturesrc || grey } onClick={ openSelectType } />

      { selectType && <div className='buttons'>
        <button onClick={ showCatSelection } className='button green'>Cat</button>
        <button onClick={ toggleSelectType } className='button'>Close</button>
      </div> }
    </Container>
  );
}

export default function Profile() {
  const { setCoolTabletOpen, userData, updateUserData } = useContext(UserContext);
  const { logout } = useContext(AuthContext);
  const { isStatus } = useContext(StatusContext);
  const [ editMode, setEditMode ] = useState<boolean>(false);
  const updating = isStatus(EnumStatus.UPDATE_USER);
  const [ emailError, setEmailError ] = useState<boolean>(false);

  const logoutOfSite = () => {
    setCoolTabletOpen(false);
    logout();
  }

  const onSubmit = (e: any) => {
    if (e) {
      e.preventDefault(); 
    }
    const { 
      username,
      bio,
      twitter,
      instagram,
      facebook,
      discord,
      email
    } = e.target.elements;

    setEmailError(false);
    const eRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !eRegex.test(email.value)) {
      setEmailError(true);
      return;
    }

    updateUserData({
      username: username.value,
      bio: bio.value,
      twitter: twitter.value,
      instgram: instagram.value,
      facebook: facebook.value,
      discord: discord.value,
      email: email.value
    });

    setEditMode(false);
  }

  // In case the user navigates to this page before userdata is loaded.
  if (!userData) {
    return null;
  }

  return (
    <>
      <h2>User Settings</h2>
      <button
        className="disconnect-button button"
        type="button"
        onClick={logoutOfSite}
      >
        Logout
      </button>
      <Container className='userprofile'>
        <ProfilePictureChooser />
        <form className="form" onSubmit={ onSubmit }>
          <div className="form-fieldsets">
            <fieldset className="form-fieldset">
              <EditableInput name='username' value={ userData.username } editMode={ editMode } />
              <EditableInput error={ emailError } name='email' type='email' value={ userData.email } editMode={ editMode } />
              <EditableInput name='bio' value={ userData.bio } type='textarea' editMode={ editMode } />
            </fieldset>
            <fieldset className="form-fieldset">
              <EditableInput name='twitter' value={ userData.twitter } editMode={ editMode } />
              <EditableInput name='instagram' value={ userData.instagram } editMode={ editMode } />
              <EditableInput name='facebook' value={ userData.facebook } editMode={ editMode } />
              <EditableInput name='discord' value={ userData.discord } editMode={ editMode } />
            </fieldset>
          </div>
          { editMode && <Container 
            elementType='button' 
            className='button green' 
            states={ [{ 
              className: 'button-disabled',
              condition: updating
            }] }
            disabled={ updating } 
          >Save info</Container> }
          { !editMode && <Container 
            elementType='button' 
            className='button green' 
            states={ [{ 
              className: 'button-disabled',
              condition: updating
            }] }
            disabled={ updating } 
            onClick={ () => setEditMode(true) }
          >Edit info</Container> }
        </form>
      </Container>
    </>
  );
}