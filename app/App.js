import { StatusBar } from 'expo-status-bar';
import { validateForm } from './components/FormValidation';
// import * as ImagePicker from 'expo-image-picker';

import {
	StyleSheet,
	Text,
	View,
	Button,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { useState } from 'react';

//
import {
	CheckInputGroup,
	RadioInputGroup,
	SwitchInputGroup,
	TextInputGroup,
	TextInputGroupReadonly,
	TextareaInputGroup,
	RadioInputGroupWrapper,
} from './components/FormInputs';

export default function App() {
	const [darkTheme, setDarkTheme] = useState(true);
	const [formFields, setFormFields] = useState([
		{
			name: 'name',
			value: '',
			error: '',
			type: 'text',
			isRequired: true,
		},
		{
			name: 'nickname',
			value: '',
			error: '',
			type: 'text',
			isRequired: true,
		},
		{
			name: 'accept',
			value: false,
			error: '',
			type: 'checkbox',
			isRequired: true,
		},
		{
			name: 'email',
			value: '',
			error: '',
			type: 'email',
			isRequired: true,
		},
		{
			name: 'password',
			value: '',
			error: '',
			type: 'password',
			isRequired: true,
		},
		{
			name: 'passwordConfirm',
			value: '',
			error: '',
			type: 'password',
			isRequired: true,
			isEqual: 'password',
		},
		{
			name: 'genre',
			value: '',
			error: '',
			type: 'radio',
			isRequired: true,
		},
		{
			name: 'age',
			value: false,
			error: '',
			type: 'switcher',
			isRequired: true,
		},
		{
			name: 'message',
			value: '',
			error: '',
			type: 'textarea',
			isRequired: true,
		},
		{
			name: 'phone',
			value: '',
			error: '',
			type: 'text',
			isRequired: true,
		},
	]);

	const validationForm = () => {
		const inputRequired = validateForm(formFields, setFormFields);
		const hasNoErrors = inputRequired.hasPassed;

		return hasNoErrors;
	};

	const handleChange = (value, name, params = {}, switcher = false) => {
		if (switcher) {
			value = !value;
		}

		setFormFields(
			formFields.map((field) => {
				if (field.name === name) {
					return {
						...field,
						value: value,
						error: '',
					};
				}
				return { ...field };
			})
		);
	};

	const handleSubmit = () => {
		const isValid = validationForm();
		console.log('cara', isValid);

		if (isValid) {
			// use async function for server validation
			console.log('SUBMITED!!!');
		}
	};

	return (
		<View style={darkTheme ? styles.containerDark : styles.container}>
			<SafeAreaView>
				<ScrollView style={styles.innerContainer}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 7 }}>
						Inputs Sample Validation
					</Text>

					<View>
						<TextInputGroupReadonly
							label='Current Version'
							value='Form v1.0'
							darkTheme={darkTheme ? true : false}
						/>

						<TextInputGroup
							label='Name'
							placeholder='Ex.: Carl John'
							name={formFields[0].name}
							error={formFields[0].error}
							handleInputForm={handleChange}
							darkTheme={darkTheme ? true : false}
							keyboardType='default'
							value={formFields[0].value}
						/>

						<TextInputGroup
							label='Nickname'
							placeholder='Ex.: Carl John'
							name={formFields[1].name}
							error={formFields[1].error}
							darkTheme={darkTheme ? true : false}
							handleInputForm={handleChange}
							keyboardType='default'
							value={formFields[1].value}
						/>

						<CheckInputGroup
							label='My Agreement'
							labelHeader='Mark the checkbox'
							name={formFields[2].name}
							error={formFields[2].error}
							darkTheme={darkTheme ? true : false}
							value={formFields[2].value}
							handleInputForm={handleChange}
						/>

						<TextInputGroup
							label='E-mail'
							placeholder='Ex.: my@email.com'
							name={formFields[3].name}
							error={formFields[3].error}
							darkTheme={darkTheme ? true : false}
							handleInputForm={handleChange}
							keyboardType='email-address'
							autoCapitalize='none'
							value={formFields[3].value}
						/>

						<TextInputGroup
							label='Password'
							name={formFields[4].name}
							error={formFields[4].error}
							darkTheme={darkTheme ? true : false}
							placeholder='******'
							secureTextEntry={true}
							handleInputForm={handleChange}
							value={formFields[4].value}
						/>

						<TextInputGroup
							label='Confirm Password'
							name={formFields[5].name}
							error={formFields[5].error}
							darkTheme={darkTheme ? true : false}
							placeholder='******'
							secureTextEntry={true}
							handleInputForm={handleChange}
							value={formFields[5].value}
						/>

						<View style={styles.division}>
							<Text>Genre</Text>
							<RadioInputGroupWrapper
								label='Choose genre'
								error={formFields[6].error}
								darkTheme={darkTheme ? true : false}
							>
								<RadioInputGroup
									label='Female'
									name='F'
									error={formFields[6].error}
									darkTheme={darkTheme ? true : false}
									group={formFields[6].name}
									value={formFields[6].value}
									handleInputForm={handleChange}
									style={{ marginBottom: 5 }}
								/>
								<RadioInputGroup
									label='Male'
									name='M'
									group={formFields[6].name}
									error={formFields[6].error}
									darkTheme={darkTheme ? true : false}
									value={formFields[6].value}
									handleInputForm={handleChange}
								/>
							</RadioInputGroupWrapper>
						</View>

						<View style={styles.division}>
							<SwitchInputGroup
								value={formFields[7].value}
								label='Switch'
								labelHeader='Are you older than 18?'
								name={formFields[7].name}
								error={formFields[7].error}
								darkTheme={darkTheme ? true : false}
								handleInputForm={handleChange}
							/>
						</View>

						<TextareaInputGroup
							label='Mensagem'
							placeholder='This is...'
							name={formFields[8].name}
							error={formFields[8].error}
							darkTheme={darkTheme ? true : false}
							multiline={true}
							handleInputForm={handleChange}
							keyboardType='default'
							value={formFields[8].value}
						/>

						<TextInputGroup
							label='Phone'
							mask='PHONE'
							error={formFields[9].error}
							darkTheme={darkTheme ? true : false}
							placeholder='(00) 0000-0000'
							handleInputForm={handleChange}
							keyboardType='numeric'
							maxLength={15}
							name={formFields[9].name}
							value={formFields[9].value}
						/>

						<Button title='Submit' onPress={handleSubmit} />

						<Text>{JSON.stringify(formFields, null, 1)}</Text>
					</View>
					<StatusBar style='auto' />
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	containerDark: {
		flex: 1,
		backgroundColor: '#3D3D3D',
	},
	innerContainer: {
		marginTop: 23,
		paddingHorizontal: 17,
		paddingVertical: 10,
		// backgroundColor: '#fff',
	},
	division: {
		marginBottom: 10,
	},
});
