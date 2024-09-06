import { type FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface FormState {
  message: string | null
  success: boolean
  fieldErrors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      fieldErrors: null,
      message: null,
      success: false,
    },
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success === true && onSuccess) {
        await onSuccess()
      }

      setFormState(state)
    })

    requestFormReset(form)
  }

  return [formState, handleSubmit, isPending] as const
}
