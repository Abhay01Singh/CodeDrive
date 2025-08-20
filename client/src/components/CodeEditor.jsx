// File: src/components/CodeEditor.jsx
import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

const languageOptions = [
  { label: "Java", value: "java", id: 62 },
  { label: "JavaScript", value: "javascript", id: 63 },
  { label: "Python", value: "python", id: 71 },
  { label: "C++", value: "cpp", id: 54 },
];

const codeTemplates = {
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}`,
  javascript: `function greet(name) {
  return "Hello, " + name;
}`,
  python: `def greet(name):
    return "Hello, " + name`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, world!";
    return 0;
}`,
};

const themes = [
  { label: "Dark (vs-dark)", value: "vs-dark" },
  { label: "Light (vs)", value: "vs" },
  { label: "High Contrast", value: "hc-black" },
];

export default function CodeEditor() {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(codeTemplates["java"]);
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleLangChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(codeTemplates[selectedLang] || "");
  };

  const handleCodeChange = (value) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running...");

    const langId = languageOptions.find((l) => l.value === language)?.id;

    try {
      const { data: submission } = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: code,
          language_id: langId,
          stdin: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "4348ff4f1dmsh5f46379ec5b0c0dp108b07jsndc8a6c2a02a7", // ⬅️ Replace this
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const token = submission.token;

      // Poll for result
      let result = null;
      while (!result || result.status.id <= 2) {
        const { data } = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              "X-RapidAPI-Key":
                "4348ff4f1dmsh5f46379ec5b0c0dp108b07jsndc8a6c2a02a7",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );
        result = data;
        await new Promise((res) => setTimeout(res, 1000)); // wait 1s
      }

      if (result.stderr) {
        setOutput(`❌ Error:\n${result.stderr}`);
      } else if (result.compile_output) {
        setOutput(`⚠️ Compile Error:\n${result.compile_output}`);
      } else {
        setOutput(`✅ Output:\n${result.stdout}`);
      }
    } catch (err) {
      console.error(err);
      setOutput("❌ Failed to run code");
    }

    setIsRunning(false);
  };

  return (
    <div className="h-screen pt-18 p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">🧠 Code Editor</h2>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="px-4 py-1.5 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60">
          {isRunning ? "Running..." : "Run ▶"}
        </button>
        <div className="flex items-center gap-2">
          <label htmlFor="language" className="text-sm font-medium">
            Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLangChange}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white dark:bg-gray-800 dark:border-gray-600">
            {languageOptions.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white dark:bg-gray-800 dark:border-gray-600">
            {themes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 shadow-lg">
        <Editor
          height="70vh"
          language={language}
          value={code}
          theme={theme}
          onChange={handleCodeChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
          }}
        />
      </div>

      <div className="mt-4 bg-black text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap">
        {output}
      </div>
    </div>
  );
}
