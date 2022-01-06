import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	Pressable,
	Switch,
	SafeAreaView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

/*
Form input options
RadioInput: raw radiobox box
CheckInput: raw checkbox
RadioInputGroup: radiobox input with style
CheckInputGroup: checkbox input with style
SwitchInputGroup: switch input with style
TextInputGroup: input text with style
- text
- message area
- password
- phone
- email
FileInputGroup: input file to access Gallery / Camera


*/
// export const FileInputGroup = ({ style, ...props }) => {
// 	const { inputLabel, value } = props;
// 	return (
// 		<View>
// 			{inputLabel && <Text style={customStyles.label}>{inputLabel}</Text>}
// 			<Text style={[customStyles.inputTextRead, style]} {...props}>
// 				{value}
// 			</Text>
// 		</View>
// 	);
// };

// textarea
export const TextareaInputGroup = ({
	style,
	label,
	name,
	error,
	handleInputForm,
	...props
}) => {
	return (
		<View>
			{label && (
				<Text style={styles.labelTop}>
					{label}{' '}
					{error && (
						<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
					)}
				</Text>
			)}
			<TextInput
				style={[styles.textareaInput, style, error && styles.inputTextError]}
				{...props}
				onChangeText={(value) => handleInputForm(value, name)}
			/>
		</View>
	);
};

// read only
export const TextInputGroupReadonly = ({
	style,
	label,
	name,
	value,
	error,
	...props
}) => {
	return (
		<View>
			{label && <Text style={styles.labelTop}>{label}</Text>}
			<Text style={[styles.inputTextReadOnly, style]} {...props}>
				{value}
			</Text>
		</View>
	);
};

export const TextInputGroup = ({
	mask = false,
	style,
	label,
	name,
	error,
	handleInputForm,
	...props
}) => {
	const handleMaskText = (value, name) => {
		let currentVal = value;

		if (mask === 'NUMBER') {
			currentVal = currentVal.replace(/\D/g, ''); //Remove tudo o que não é dígito
		}

		if (mask === 'PHONE') {
			currentVal = currentVal.replace(/\D/g, ''); //Remove tudo o que não é dígito
			currentVal = currentVal.replace(/^(\d\d)(\d)/g, '($1) $2'); //Coloca parênteses em volta dos dois primeiros dígitos

			// check digit 9
			if (currentVal.length > 13) {
				currentVal = currentVal.replace(/(\d{5})(\d)/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
			} else {
				currentVal = currentVal.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
			}
		}

		if (mask === 'CEP') {
			currentVal = currentVal.replace(/\D/g, ''); //Remove tudo o que não é dígito
			currentVal = currentVal.replace(/^(\d{5})(\d)/, '$1-$2'); //Esse é tão fácil que não merece explicações
		}

		if (mask === 'CPF') {
			currentVal = currentVal.replace(/\D/g, ''); //Remove tudo o que não é dígito
			currentVal = currentVal.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
			currentVal = currentVal.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
			//de novo (para o segundo bloco de números)
			currentVal = currentVal.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
		}

		handleInputForm(currentVal, name);
	};

	return (
		<View>
			{label && (
				<Text style={styles.labelTop}>
					{label}{' '}
					{error && (
						<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
					)}
				</Text>
			)}
			<TextInput
				style={[styles.inputText, style, error && styles.inputTextError]}
				{...props}
				onChangeText={(value) =>
					mask ? handleMaskText(value, name) : handleInputForm(value, name)
				}
			/>
		</View>
	);
};

export const SwitchInputGroup = ({
	label,
	labelHeader,
	name,
	value,
	error,
	handleInputForm,
}) => {
	return (
		<>
			<Text style={styles.labelTop}>
				<>
					{labelHeader}{' '}
					{error && (
						<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
					)}
				</>
			</Text>
			<View style={[styles.SwitchInputGroup, error && styles.inputTextError]}>
				<Text style={styles.inlineLabel}>{label}</Text>
				<Switch
					trackColor={{ false: '#cdcdcd', true: '#6edc5f' }}
					thumbColor={value ? '#fff' : '#fff'}
					ios_backgroundColor='#cdcdcd'
					onValueChange={() => handleInputForm(value, name, true)}
					value={value}
				/>
			</View>
		</>
	);
};

export const CheckInputGroup = ({
	label,
	labelHeader,
	name,
	value,
	error,
	handleInputForm,
}) => {
	return (
		<>
			<Text style={styles.labelTop}>
				{labelHeader}{' '}
				{error && (
					<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
				)}
			</Text>

			<View
				style={[styles.checkInputGroupWrap, error && styles.inputTextError]}
			>
				<Pressable
					onPress={() => handleInputForm(value, name, true)}
					style={styles.checkInputGroupTouchable}
				>
					<CheckInput
						value={value}
						style={{ marginRight: 10 }}
						onPress={() => handleInputForm(value, name, true)}
					/>
					<Text style={styles.inlineLabel}>{label}</Text>
				</Pressable>
			</View>
		</>
	);
};

// group all radios
export const RadioInputGroupWrapper = ({ label, error, children }) => {
	return (
		<View>
			<Text style={styles.labelTop}>
				<>
					{label}{' '}
					{error && (
						<Text style={{ color: 'red', fontWeight: 'normal' }}>{error}</Text>
					)}
				</>
			</Text>
			{children}
		</View>
	);
};
//
export const RadioInputGroup = ({
	label,
	name,
	value,
	group,
	error,
	handleInputForm,
}) => {
	return (
		<>
			<View
				style={[styles.checkInputGroupWrap, error && styles.inputTextError]}
			>
				<Pressable
					onPress={() => handleInputForm(name, group)}
					style={styles.checkInputGroupTouchable}
				>
					<RadioInput
						value={value}
						name={name}
						style={{ marginRight: 7 }}
						onPress={() => handleInputForm(name, group)}
					/>

					<Text style={styles.inlineLabel}>{label}</Text>
				</Pressable>
			</View>
		</>
	);
};

export const RadioInput = ({ value, name, style, onPress, ...props }) => {
	return (
		<Pressable onPress={onPress}>
			<View
				style={[
					styles.checkboxIconWrap,
					{
						borderColor: value === name ? '#6E00F0' : '#6E00F0',
						backgroundColor: value === name ? 'white' : 'white',
					},
					style,
				]}
				{...props}
			>
				{value === name && (
					<Ionicons
						name='ellipse'
						type='Ionicons'
						style={styles.radioboxIcon}
					/>
				)}
			</View>
		</Pressable>
	);
};

export const CheckInput = ({ value, name, style, onPress, ...props }) => {
	return (
		<Pressable onPress={onPress}>
			<View
				style={[
					styles.radioboxIconWrap,
					{
						borderWidth: value ? 0 : 2,
						borderColor: value ? '#5905BC' : '#6E00F0',
						backgroundColor: value ? '#6E00F0' : 'white',
					},
					style,
				]}
				{...props}
			>
				{value && (
					<Ionicons
						name='checkmark'
						type='Ionicons'
						style={styles.checkboxIcon}
					/>
				)}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	// basic icon check
	checkboxIcon: {
		borderWidth: 0,
		lineHeight: 19,
		color: 'white',
		fontSize: 17,
		textAlign: 'center',
	},
	checkboxIconWrap: {
		width: 20,
		height: 20,
		borderRadius: 22,
		borderWidth: 2,
	},
	// basic icon radio
	radioboxIcon: {
		borderWidth: 0,
		paddingLeft: 1, // hack
		lineHeight: 16,
		color: '#6E00F0',
		fontSize: 13,
		textAlign: 'center',
	},
	radioboxIconWrap: {
		width: 20,
		height: 20,
		borderRadius: 3,
	},
	// label
	inlineLabel: {
		fontSize: 16,
		marginLeft: 7,
		color: 'black',
	},
	labelTop: {
		fontWeight: 'bold',
		marginBottom: 5,
		color: 'black',
	},
	// checkbox group
	checkInputGroupWrap: {
		backgroundColor: '#eee',
		borderRadius: 8,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		overflow: 'hidden',
	},
	checkInputGroupTouchable: {
		paddingHorizontal: 15,
		height: 45,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
	},
	// switch group
	SwitchInputGroup: {
		backgroundColor: '#eee',
		borderRadius: 8,
		paddingHorizontal: 10,
		height: 45,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	// input text
	inputText: {
		borderColor: '#D1D1D1',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 15,
		fontSize: 18,
		height: 45,
		marginBottom: 15,
	},
	inputTextReadOnly: {
		backgroundColor: '#F5F5F5',
		lineHeight: 45,
		borderRadius: 8,
		overflow: 'hidden',
		paddingHorizontal: 15,
		fontSize: 18,
		height: 45,
		marginBottom: 15,
	},
	textareaInput: {
		borderColor: '#D1D1D1',
		alignItems: 'flex-start',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 15,
		fontSize: 18,
		minHeight: 80,
		maxHeight: 200,
		marginBottom: 15,
		paddingTop: 10,
		paddingBottom: 8,
		textAlignVertical: 'top', // hack Android
	},
	// error
	inputTextError: {
		borderWidth: 1,
		borderColor: 'red',
	},
});
