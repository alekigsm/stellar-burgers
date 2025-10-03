import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, setUser } from '../../slice/user/userSlice';
import { Preloader } from '@ui';
import { updateUser } from '../../slice/user/actions';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */

  const user = useSelector(getUserData);
  const dispatch = useDispatch();
  if (!user) {
    return <Preloader />;
  }

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);
  console.log('dos', user);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  /// верно?
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('do', user);
    if (user) {
      dispatch(
        setUser({
          name: formValue.name,
          email: formValue.email
        })
      );
    }
    console.log(`posle`, formValue.name);
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
