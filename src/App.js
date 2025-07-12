import { useState } from 'react';
import { Textarea } from './components/ui/textarea';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import axios from 'axios';

export default function ArtistBioCreator() {
  const [form, setForm] = useState({
    name: '', location: '', style: '', process: '', causes: '',
    identity: '', inspiration: '', bestWork: '', clientFeedback: '',
    childhoodInfluence: '', training: '', addedValue: '', personality: ''
  });
  const [tone, setTone] = useState('friendly');
  const [gptBio, setGptBio] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleToneChange = (e) => setTone(e.target.value);
  const generateWithGPT = async () => {
    setLoading(true);
    setGptBio('');
    const prompt = `Write a 200-250 word first-person artist bio in a ${tone} tone. Include the artist's style, process, inspiration, identity, values, and a fun personal detail.
Name: ${form.name}
Location: ${form.location}
Style: ${form.style}
Process: ${form.process}
Causes: ${form.causes}
Identity: ${form.identity}
Inspiration: ${form.inspiration}
Best Work: ${form.bestWork}
Client Feedback: ${form.clientFeedback}
Childhood Influence: ${form.childhoodInfluence}
Training: ${form.training}
Added Value: ${form.addedValue}
Personality: ${form.personality}`;
    try {
      const response = await axios.post('https://openai-proxy.onrender.com/generate-bio', { prompt });
      setGptBio(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Backend error:', error);
      setGptBio('Sorry! Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='grid gap-4 p-6 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold'>Artist Bio Creator</h1>
      <Input placeholder='Full Name' name='name' value={form.name} onChange={handleChange} />
      <Input placeholder='Location' name='location' value={form.location} onChange={handleChange} />
      <Textarea placeholder='Style' name='style' value={form.style} onChange={handleChange} />
      <Textarea placeholder='Process' name='process' value={form.process} onChange={handleChange} />
      <Textarea placeholder='Causes' name='causes' value={form.causes} onChange={handleChange} />
      <Textarea placeholder='Identity' name='identity' value={form.identity} onChange={handleChange} />
      <Textarea placeholder='Inspiration' name='inspiration' value={form.inspiration} onChange={handleChange} />
      <Textarea placeholder='Best Work' name='bestWork' value={form.bestWork} onChange={handleChange} />
      <Textarea placeholder='Client Feedback' name='clientFeedback' value={form.clientFeedback} onChange={handleChange} />
      <Textarea placeholder='Childhood Influence' name='childhoodInfluence' value={form.childhoodInfluence} onChange={handleChange} />
      <Textarea placeholder='Training' name='training' value={form.training} onChange={handleChange} />
      <Textarea placeholder='Added Value' name='addedValue' value={form.addedValue} onChange={handleChange} />
      <Textarea placeholder='Personality' name='personality' value={form.personality} onChange={handleChange} />
      <select value={tone} onChange={handleToneChange}>
        <option value='friendly'>Friendly</option>
        <option value='witty'>Witty</option>
        <option value='professional'>Professional</option>
        <option value='poetic'>Poetic</option>
        <option value='inspirational'>Inspirational</option>
      </select>
      <Button onClick={generateWithGPT} disabled={loading}>{loading ? 'Generating...' : 'Generate Bio'}</Button>
      {gptBio && <Card><CardContent><h2 className='font-semibold'>Generated Bio</h2><p className='whitespace-pre-line'>{gptBio}</p></CardContent></Card>}
    </div>
  );
}