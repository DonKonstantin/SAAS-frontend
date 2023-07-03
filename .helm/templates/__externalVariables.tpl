{{- define "externalVariables" }}
{{- range $key, $variableCode := .Values.envExternalVariableCodes }}
- name: {{ $variableCode | quote }}
  value: {{ (index $.Values.external $variableCode) | quote }}
{{- end }}
{{- end }}