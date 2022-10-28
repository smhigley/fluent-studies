import React from 'react';
import { Button, Text } from '@fluentui/react-components';
import { Option } from '@fluentui/react-components/unstable';
import { ComboboxFreeformB } from './components/ComboboxFreeformB';
import { ComboboxMultiB } from './components/ComboboxMultiB';
import { DropdownSingleB } from './components/DropdownSingleB';
import { DropdownMultiB } from './components/DropdownMultiB';
import { OptionMultiB } from './components/OptionMultiB';
import { makeStyles, shorthands } from '@griffel/react';
import './App.css';

export interface FormBProps {
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

export function FormB(props: FormBProps) {
  const styles = useFormStyles();

  const [meal, setMeal] = React.useState<string>();
  const [cuisine, setCuisine] = React.useState<string[]>([]);
  const [ingredient, setIngredient] = React.useState<string>();
  const [dietary, setDietary] = React.useState<string[]>([]);
  const [author, setAuthor] = React.useState<string>();

  // validation states
  const [submitted, setSubmitted] = React.useState(false);
  const [mealValid, setMealValid] = React.useState(false);
  const [cuisineValid, setCuisineValid] = React.useState(false);
  const [ingredientValid, setIngredientValid] = React.useState(false);
  const [dietaryValid, setDietaryValid] = React.useState(false);
  const [authorValid, setAuthorValid] = React.useState(false);

  const validateCuisine = (value: string[]) => {
    const validValues = ['chinese', 'french', 'south asian'];
    if (value.length !== 3) {
      return setCuisineValid(false);
    }

    let valid = true;
  
    for (const cuisine of value) {
      if (!validValues.includes(cuisine.toLowerCase())) {
        valid = false;
      }
    }

    setCuisineValid(valid);
  }

  const onSubmit = () => {
    setMealValid(meal === 'Dinner');
    setIngredientValid(!!ingredient && ingredient.toLowerCase().indexOf('chicken') > -1);
    setDietaryValid(dietary.includes('Low cholesterol'));
    setAuthorValid(author === 'Amanda Brady');
    validateCuisine(cuisine);
    setSubmitted(true);
  }

  const checkFormValid = () => {
    return submitted && mealValid && cuisineValid && ingredientValid && dietaryValid && authorValid;
  }

  return (
    <>
    {!checkFormValid() ?
      <form noValidate className={styles.form} onSubmit={onSubmit}>
        <Text size={800} as="h1">Find a Recipe (Dinner)</Text>

        <div className={styles.field}>
          <label htmlFor="meal">Meal or course</label>
          <DropdownSingleB id="meal" aria-describedby="meal-error" onOptionSelect={(ev, data) => {
            setMeal(data.optionValue);
            setMealValid(data.optionValue === 'Dinner');
          }}>
            <Option>Breakfast</Option>
            <Option>Dinner</Option>
            <Option>Lunch</Option>
            <Option>Starter</Option>
            <Option>Side</Option>
            <Option>Main</Option>
            <Option>Snack</Option>
          </DropdownSingleB>
          {submitted && !mealValid ?
            <div className={styles.error} role="alert" id="meal-error">Please select "Dinner" as the meal or course.</div>
          : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cuisine">Cuisine</label>
          <ComboboxMultiB id="cuisine" multiselect onOptionSelect={(ev, data) => {
            setCuisine(data.selectedOptions);
            validateCuisine(data.selectedOptions);
          }}>
            <Option>African</Option>
            <Option>American</Option>
            <Option>British</Option>
            <Option>Cajun/Creole</Option>
            <Option>Caribbean</Option>
            <Option>Chinese</Option>
            <Option>Cuban</Option>
            <Option>Eastern European</Option>
            <Option>French</Option>
            <Option>German</Option>
            <Option>South American</Option>
            <Option>South Asian</Option>
          </ComboboxMultiB>
          {submitted && !cuisineValid ?
            <div className={styles.error} role="alert" id="cuisine-error">Please choose Chinese, French, and South Asian as cuisines.</div>
          : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="ingredient">Main ingredient</label>
          <ComboboxFreeformB id="ingredient" aria-describedby="ingredient-error" freeform onOptionSelect={(ev, data) => {
            setIngredient(data.optionValue);
            setIngredientValid(!!data.optionValue && data.optionValue.toLowerCase().indexOf('chicken') > -1);
          }}>
            <Option>Beef</Option>
            <Option>Broccoli</Option>
            <Option>Brussels sprouts</Option>
            <Option>Cabbage</Option>
            <Option>Carrot</Option>
            <Option>Cauliflower</Option>
            <Option>Chicken</Option>
          </ComboboxFreeformB>
          {submitted && !ingredientValid ?
            <div className={styles.error} role="alert" id="ingredient-error">Please add "Chicken" as the desired ingredient.</div>
          : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="dietary">Dietary concerns</label>
          <DropdownMultiB id="dietary" aria-describedby="dietary-error" multiselect onOptionSelect={(ev, data) => {
            setDietary(data.selectedOptions);
            setDietaryValid(data.selectedOptions.includes('Low cholesterol'));
          }}>
            <OptionMultiB>High fiber</OptionMultiB>
            <OptionMultiB>Kosher</OptionMultiB>
            <OptionMultiB>Dairy-free</OptionMultiB>
            <OptionMultiB>Low cholesterol</OptionMultiB>
            <OptionMultiB>Low fat</OptionMultiB>
            <OptionMultiB>Low sodium</OptionMultiB>
            <OptionMultiB>Low sugar</OptionMultiB>
            <OptionMultiB>Vegan</OptionMultiB>
            <OptionMultiB>Vegetarian</OptionMultiB>
            <OptionMultiB>Gluten-free</OptionMultiB>
          </DropdownMultiB>
          {submitted && !dietaryValid ?
            <div className={styles.error} role="alert" id="dietary-error">Please add "Low cholesterol" as a dietary concern.</div>
          : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="author">Recipe author</label>
          <ComboboxFreeformB id="author" onOptionSelect={(ev, data) => {
            setAuthor(data.optionValue);
            setAuthorValid(data.optionValue === 'Amanda Brady');
          }}>
            <Option>Allan Munger</Option>
            <Option>Amanda Brady</Option>
            <Option>Amy Smith</Option>
            <Option>Babak Shammas</Option>
            <Option>Beth Davies</Option>
            <Option>Cameron Evans</Option>
            <Option>Carlos Slattery</Option>
            <Option>Cecil Folk</Option>
            <Option>Celeste Burton</Option>
            <Option>Chris Naidoo</Option>
            <Option>Colin Ballinger</Option>
          </ComboboxFreeformB>
          {submitted && !authorValid ?
            <div className={styles.error} role="alert" id="author-error">Please choose "Amanda Brady" as the recipe author.</div>
          : null}
        </div>

        <div className={styles.field}>
          <Button appearance='primary' type='submit'>Search</Button>
        </div>
      </form>
    : // if the form is submitted and valid, show the success message
      <div className={styles.success}>
        <div role="alert" style={{ fontWeight: 'bold' }}>Success! Form submitted.</div>
        {props.showNextForm
          ? <Button appearance='primary' onClick={() => props.onFormSubmit()}>Next: Lunch Form</Button>
          : <p>Both forms are completed! Thanks for working through them. This window can now be closed.</p>
        }
      </div>}
    </>
  );
}
