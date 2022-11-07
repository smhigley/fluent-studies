import React from 'react';
import { Button, Text } from '@fluentui/react-components';
import { Combobox, Dropdown, Option } from '@fluentui/react-components/unstable';
import { makeStyles, shorthands } from '@griffel/react';
import { ComboboxMultiA } from './components/ComboboxMultiA';
import './App.css';

export interface FormAProps {
  showNextForm: boolean;

  onFormSubmit: () => void;
}

const useFormStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2em',
  },
  label: {
    display: 'block',
    fontSize: '1.25em',
  },
  listbox: {
    maxHeight: '300px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.25em',
    alignItems: 'stretch',
    maxWidth: '25em',
  },
  error: {
    color: 'red',
    paddingBottom: '0.5em'
  },
  success: {
    color: 'green',
    backgroundColor: '#f4fff4',
    fontSize: '1.25em',
    ...shorthands.border('1px', 'solid', 'green'),
    ...shorthands.padding('1.5em'),
    ...shorthands.margin('2em')
  }
});

export function FormA(props: FormAProps) {
  const styles = useFormStyles();

  const [meal, setMeal] = React.useState<string>();
  const [cuisine, setCuisine] = React.useState<string[]>([]);
  const [ingredient, setIngredient] = React.useState<string>();
  const [dietary, setDietary] = React.useState<string[]>([]);
  const [author, setAuthor] = React.useState<string>();

  // validation states
  const [submitted, setSubmitted] = React.useState(false);
  const [cuisineValid, setCuisineValid] = React.useState(false);
  const [mealValid, setMealValid] = React.useState(false);
  const [ingredientValid, setIngredientValid] = React.useState(false);
  const [dietaryValid, setDietaryValid] = React.useState(false);
  const [authorValid, setAuthorValid] = React.useState(false);
  const [formValid, setFormValid] = React.useState(false);

  const validateCuisine = (value: string[]): boolean => {
    const requiredValue = 'South Asian';
    if (value.length !== 2) {
      setCuisineValid(false);
      return false;
    }

    const valid = value.includes(requiredValue);

    setCuisineValid(valid);
    return valid;
  }

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const mealValid = meal === 'Lunch';
    const cuisineValid = validateCuisine(cuisine);
    const ingredientValid = !!ingredient && ingredient.toLowerCase().indexOf('tofu') > -1;
    const dietaryValid = dietary.length > 1 && dietary.includes('Low cholesterol');
    const authorValid = author === 'Amy Smith';
    const formValid = mealValid && cuisineValid && ingredientValid && dietaryValid && authorValid;

    setMealValid(mealValid);
    setIngredientValid(ingredientValid);
    setDietaryValid(dietaryValid);
    setAuthorValid(authorValid);
    setFormValid(formValid);
    setSubmitted(true);
  }

  return (
    <>
    {!formValid ?
      <form noValidate className={styles.form} onSubmit={onSubmit}>
        <Text size={800} as="h1">Find a Recipe (Lunch)</Text>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="meal">Meal or course</label>
          <Dropdown id="meal" aria-describedby="meal-error" root={{ 'aria-owns': 'meal-listbox' }} listbox={{ id: 'meal-listbox', className: styles.listbox }} onOptionSelect={(ev, data) => {
            setMeal(data.optionValue);
            setMealValid(data.optionValue === 'Lunch');
          }}>
            <Option>Breakfast</Option>
            <Option>Dinner</Option>
            <Option>Lunch</Option>
            <Option>Starter</Option>
            <Option>Side</Option>
            <Option>Main</Option>
            <Option>Snack</Option>
          </Dropdown>
          {submitted && !mealValid ?
            <div className={styles.error} role="alert" id="meal-error">Please select "Lunch" as the meal or course.</div>
          : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cuisine">Cuisine</label>
          <ComboboxMultiA autoComplete="off" id="cuisine" multiselect root={{ 'aria-owns': 'cuisine-listbox' }} listbox={{ id: 'cuisine-listbox', className: styles.listbox }} onOptionSelect={(ev, data) => {
            setCuisine(data.selectedOptions);
            validateCuisine(data.selectedOptions);
          }}>
            <Option>African</Option>
            <Option>American</Option>
            <Option>Asian</Option>
            <Option>British</Option>
            <Option>Cajun/Creole</Option>
            <Option>Californian</Option>
            <Option>Caribbean</Option>
            <Option>Central/South American</Option>
            <Option>Chinese</Option>
            <Option>Cuban</Option>
            <Option>Eastern European</Option>
            <Option>English</Option>
            <Option>European</Option>
            <Option>French</Option>
            <Option>German</Option>
            <Option>Greek</Option>
            <Option>Indian</Option>
            <Option>Irish</Option>
            <Option>Italian</Option>
            <Option>Italian American</Option>
            <Option>Japanese</Option>
            <Option>Jewish</Option>
            <Option>Korean</Option>
            <Option>Latin American</Option>
            <Option>Mediterranean</Option>
            <Option>Mexican</Option>
            <Option>Middle Eastern</Option>
            <Option>Moroccan</Option>
            <Option>Nuevo Latino</Option>
            <Option>Scandinavian</Option>
            <Option>South American</Option>
            <Option>South Asian</Option>
            <Option>Southeast Asian</Option>
            <Option>Southern</Option>
            <Option>Southwestern</Option>
            <Option>Spanish/Portuguese</Option>
            <Option>Tex-Mex</Option>
            <Option>Thai</Option>
            <Option>Turkish</Option>
            <Option>Vietnamese</Option>
          </ComboboxMultiA>
          {submitted && !cuisineValid ?
            <div className={styles.error} role="alert" id="cuisine-error">Please choose South Asian and one other cuisine.</div>
          : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="ingredient">Main ingredient</label>
          <Combobox autoComplete="off" id="ingredient" aria-describedby="ingredient-error" freeform root={{ 'aria-owns': 'ingredient-listbox' }} listbox={{ id: 'ingredient-listbox', className: styles.listbox }} onChange={(ev) => {
            setIngredient(ev.target.value);
            setIngredientValid(!!ev.target.value && ev.target.value.toLowerCase().indexOf('tofu') > -1);
          }}>
            <Option>Beef</Option>
            <Option>Broccoli</Option>
            <Option>Brussels sprouts</Option>
            <Option>Cabbage</Option>
            <Option>Carrot</Option>
            <Option>Cauliflower</Option>
            <Option>Chicken</Option>
          </Combobox>
          {submitted && !ingredientValid ?
            <div className={styles.error} role="alert" id="ingredient-error">Please enter "Tofu" as the desired ingredient.</div>
          : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="dietary">Dietary concerns</label>
          <Dropdown id="dietary" aria-describedby="dietary-error" multiselect root={{ 'aria-owns': 'dietary-listbox' }} listbox={{ id: 'dietary-listbox', className: styles.listbox }} onOptionSelect={(ev, data) => {
            setDietary(data.selectedOptions);
            setDietaryValid(data.selectedOptions.length > 1 && data.selectedOptions.includes('Low cholesterol'));
          }}>
            <Option>High fiber</Option>
            <Option>Kosher</Option>
            <Option>Dairy-free</Option>
            <Option>Low cholesterol</Option>
            <Option>Low fat</Option>
            <Option>Low sodium</Option>
            <Option>Low sugar</Option>
            <Option>Vegan</Option>
            <Option>Vegetarian</Option>
            <Option>Gluten-free</Option>
          </Dropdown>
          {submitted && !dietaryValid ?
            <div className={styles.error} role="alert" id="dietary-error">Please add "Low cholesterol" as a dietary concern.</div>
          : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="author">Recipe author</label>
          <Combobox autoComplete="off" id="author" root={{ 'aria-owns': 'author-listbox' }} listbox={{ id: 'author-listbox', className: styles.listbox }} onOptionSelect={(ev, data) => {
            setAuthor(data.optionValue);
            setAuthorValid(data.optionValue === 'Amy Smith');
          }}>
            <Option>Allan Munger</Option>
            <Option>Amanda Brady</Option>
            <Option>Amy Huang</Option>
            <Option>Amy Smith</Option>
            <Option>Babak Shammas</Option>
            <Option>Beth Davies</Option>
            <Option>Cameron Evans</Option>
            <Option>Carlos Slattery</Option>
            <Option>Cecil Folk</Option>
            <Option>Celeste Burton</Option>
            <Option>Chris Naidoo</Option>
            <Option>Colin Ballinger</Option>
          </Combobox>
          {submitted && !authorValid ?
            <div className={styles.error} role="alert" id="author-error">Please choose "Amy Smith" as the recipe author.</div>
          : null}
        </div>

        <div className={styles.field}>
          <Button appearance='primary' type='submit'>Search</Button>
          {props.showNextForm ? <Button type='button' onClick={() => props.onFormSubmit()}>Skip to dinner form</Button> : null}
        </div>
      </form>
    : // if the form is submitted and valid, show the success message
      <div className={styles.success}>
        <div role="alert" style={{ fontWeight: 'bold' }}>Success! Form submitted.</div>
        {props.showNextForm
          ? <Button appearance='primary' onClick={() => props.onFormSubmit()}>Next: Dinner Form</Button>
          : <p>Both forms are completed! Thanks for working through them. This window can now be closed.</p>
        }
      </div>}
    </>
  );
}
