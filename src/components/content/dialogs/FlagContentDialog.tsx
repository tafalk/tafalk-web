import React, { useState, useRef, useEffect } from 'react'
import { BasicDialogProps } from 'types/props'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  TextField,
  createStyles,
  makeStyles,
  Theme,
  IconButton,
  Typography,
  CircularProgress
} from '@material-ui/core'
import CloseIcon from 'mdi-material-ui/Close'
import { useTranslation } from 'react-i18next'
import { ContentType, GetFlagByIdQuery } from 'types/appsync/API'
import API, { graphqlOperation } from '@aws-amplify/api'
import { CreateCantoFlag, GetFlagById } from 'graphql/custom'
import { useSnackbar } from 'notistack'

interface FlagContentDialogProps extends BasicDialogProps {
  contentType: ContentType
  contentId: string
  flaggerUserId: string
  // For edit
  flagId?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    dialogTitle: {
      margin: 0,
      padding: theme.spacing(2)
    },
    dialogCloseButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  })
)

const FlagContentDialog: React.FC<FlagContentDialogProps> = (props) => {
  const { onClose, open, contentType, contentId, flaggerUserId, flagId } = props
  const classes = useStyles()
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0)
  const detailTextRef = useRef<HTMLInputElement>()
  const [detailText, setDetailText] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const steps = [
    { code: 'category', label: t('flagContentDialog.steps.category.label') },
    { code: 'type', label: t('flagContentDialog.steps.type.label') },
    { code: 'detail', label: t('flagContentDialog.steps.detail.label') }
  ]

  const categories = [
    {
      code: 'spam',
      primaryText: t('flagContentDialog.steps.category.items.spam.primary'),
      secondaryText: t('flagContentDialog.steps.category.items.spam.secondary')
    },
    {
      code: 'rude',
      primaryText: t('flagContentDialog.steps.category.items.rude.primary'),
      secondaryText: t('flagContentDialog.steps.category.items.rude.secondary')
    },
    {
      code: 'loQlty',
      primaryText: t('flagContentDialog.steps.category.items.loQlty.primary'),
      secondaryText: t(
        'flagContentDialog.steps.category.items.loQlty.secondary'
      )
    }
  ]

  const types = [
    {
      code: 'ad',
      category: 'spam',
      primaryText: t('flagContentDialog.steps.type.items.spam.ad.primary'),
      secondaryText: t('flagContentDialog.steps.type.items.spam.ad.secondary')
    },
    {
      code: 'harmful',
      category: 'spam',
      primaryText: t('flagContentDialog.steps.type.items.spam.harmful.primary'),
      secondaryText: t(
        'flagContentDialog.steps.type.items.spam.harmful.secondary'
      )
    },
    {
      code: 'hate',
      category: 'rude',
      primaryText: t('flagContentDialog.steps.type.items.rude.hate.primary'),
      secondaryText: t('flagContentDialog.steps.type.items.rude.hate.secondary')
    },
    {
      code: 'threat',
      category: 'rude',
      primaryText: t('flagContentDialog.steps.type.items.rude.threat.primary'),
      secondaryText: t(
        'flagContentDialog.steps.type.items.rude.threat.secondary'
      )
    },
    {
      code: 'offensive',
      category: 'rude',
      primaryText: t(
        'flagContentDialog.steps.type.items.rude.offensive.primary'
      ),
      secondaryText: t(
        'flagContentDialog.steps.type.items.rude.offensive.secondary'
      )
    },
    {
      code: 'private',
      category: 'rude',
      primaryText: t('flagContentDialog.steps.type.items.rude.private.primary'),
      secondaryText: t(
        'flagContentDialog.steps.type.items.rude.private.secondary'
      )
    },
    {
      code: 'private',
      category: 'loQlty',
      primaryText: t(
        'flagContentDialog.steps.type.items.loQlty.nonsense.primary'
      ),
      secondaryText: t(
        'flagContentDialog.steps.type.items.loQlty.nonsense.secondary'
      )
    }
  ]

  // Side effect: Load existing flag info (i.e. category, type, detail) if exists
  useEffect(() => {
    ;(async () => {
      try {
        if (!flagId) return

        const flagGraphqlResponse = (await API.graphql(
          graphqlOperation(GetFlagById, {
            id: flagId
          })
        )) as {
          data: GetFlagByIdQuery
        }
        const flagResult = flagGraphqlResponse.data.getFlag
        setSelectedCategoryIndex(
          categories.findIndex((c) => c.code === flagResult?.category)
        )
        setSelectedTypeIndex(
          types.findIndex((t) => t.code === flagResult?.type)
        )
        setDetailText(flagResult?.detail ?? '')
      } catch (err) {
        enqueueSnackbar(JSON.stringify(err), {
          variant: 'error'
        })
      }
    })()
  }, [flagId])

  // Functions
  const saveFlag = async () => {
    setSaveLoading(true)
    try {
      if (contentType === ContentType.canto) {
        await API.graphql(
          graphqlOperation(CreateCantoFlag, {
            contentId,
            flaggerUserId,
            category: categories[selectedCategoryIndex].code,
            type: types[selectedTypeIndex].code,
            detail: detailTextRef.current?.value
          })
        )
      }
      onClose()
    } catch (err) {
      enqueueSnackbar(JSON.stringify(err), {
        variant: 'error'
      })
    } finally {
      setSaveLoading(false)
    }
  }
  // render
  const renderCategoryStepContent = (
    <List aria-label="category">
      {categories.map((c) => (
        <ListItem
          button
          selected={
            selectedCategoryIndex ===
            categories.findIndex((el) => el.code === c.code)
          }
          onClick={() =>
            setSelectedCategoryIndex(
              categories.findIndex((el) => el.code === c.code)
            )
          }
        >
          <ListItemText primary={c.primaryText} secondary={c.secondaryText} />
        </ListItem>
      ))}
    </List>
  )
  const renderTypeStepContent = (
    <List aria-label="type">
      {types
        .filter((el) => el.category === categories[selectedCategoryIndex].code)
        .map((t) => (
          <ListItem
            button
            selected={
              selectedTypeIndex === types.findIndex((el) => el.code === t.code)
            }
            onClick={() =>
              setSelectedTypeIndex(types.findIndex((el) => el.code === t.code))
            }
          >
            <ListItemText primary={t.primaryText} secondary={t.secondaryText} />
          </ListItem>
        ))}
    </List>
  )

  const renderDetailStepContent = (
    <TextField
      inputRef={detailTextRef}
      label={t('flagContentDialog.steps.detail.textfield.label')}
      placeholder={t('flagContentDialog.steps.detail.textfield.placeholder')}
      multiline
      rowsMax={4}
      // defaultValue="Default Value"
      variant="outlined"
      onChange={(e) => setDetailText(e.target.value)}
    />
  )
  const GetStepContent = () => {
    if (activeStep === steps.findIndex((el) => el.code === 'category')) {
      return <div>{renderCategoryStepContent}</div>
    }
    if (activeStep === steps.findIndex((el) => el.code === 'type')) {
      return <div>{renderTypeStepContent}</div>
    }
    if (activeStep === steps.findIndex((el) => el.code === 'detail')) {
      return <div>{renderDetailStepContent}</div>
    }
    return <div></div>
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h6">{t('flagContentDialog.title')}</Typography>
        <IconButton
          aria-label="close"
          className={classes.dialogCloseButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/** Stepper Header */}
        <Stepper activeStep={activeStep}>
          <Step>
            {steps.map((el) => (
              <Step key={el.code}>
                <StepLabel>{el.label}</StepLabel>
              </Step>
            ))}
          </Step>
        </Stepper>
        <GetStepContent />
      </DialogContent>
      <DialogActions>
        {activeStep > 0 ? (
          <Button onClick={onClose} disableElevation>
            {t('common.previous')}
          </Button>
        ) : undefined}
        <div className={classes.grow} />
        {activeStep !== steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }}
            disableElevation
          >
            {t('common.next')}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={saveFlag}
            disableElevation
            disabled={saveLoading}
          >
            {!saveLoading ? t('common.done') : <CircularProgress size={14} />}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default FlagContentDialog
