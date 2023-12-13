import axios from 'axios';

const URL = '';

export const addUser = async (data) => {
  try {
    return await axios.post(`${URL}/add`, data);
  } catch (err) {
    console.log('Error while calling addUSer api', err);
  }
};
export const SignupUser = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (err) {
    console.log('Error while calling addUSer api', err);
  }
};

export const LoginUser = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (err) {
    console.log('Error while calling loginUser api', err);
  }
};

export const getUSers = async () => {
  try {
    return await axios.get(`${URL}/admin/all`);
  } catch (err) {
    console.log('Error while calling getUsers API', err);
  }
};

export const getUSer = async (id) => {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (err) {
    console.log('Error while calling getUsers API', err);
  }
};

export const editUser = async (id, user) => {
  try {
    return await axios.put(`${URL}/admin/${id}`, user);
  } catch (err) {
    console.log('Error while calling edituser', err);
  }
};

export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${URL}/${id}`);
  } catch (err) {
    console.log('Error while calling deleteUser api', err);
  }
};

export const chatWithGPT3 = async (search) => {
  const apiKey = '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';
  const yourPrompt = search;
  console.log(yourPrompt);
  // URL for GPT-3 API endpoint
  const gpt3Endpoint = 'https://api.openai.com/v1/completions';

  try {
    const response = await axios.post(
      gpt3Endpoint,
      {
        prompt: yourPrompt,
        max_tokens: 100, // Adjust max_tokens based on the desired length of the completion
        model: 'gpt-3.5-turbo-instruct',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching GPT-3 response:', error);
    throw error;
  }
};

// export const findInChatGPT = async (id, data) => {
//   try {
//     return await axios.post(`${URL}/${id}`, data);
//   } catch (err) {
//     console.log('Error while calling find api', err);
//   }
// };
